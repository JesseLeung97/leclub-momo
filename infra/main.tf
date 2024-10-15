terraform {
  required_version = ">= 1.2.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "jessetleung-terraform-state-files"
    key    = "leclubmomo/terraform.tfstate"
    region = "us-east-1"
  }

}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = var.common_tags
  }
}

####################
# Route53
####################

resource "aws_route53_zone" "leclub_momo_zone" {
  name = var.domain_name
}

resource "aws_route53_record" "validation_records" {
  for_each = {
    for dvo in aws_acm_certificate.leclub_momo_certificate.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = aws_route53_zone.leclub_momo_zone.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_route53_record" "root_alias" {
  name    = var.domain_name
  type    = "A"
  zone_id = aws_route53_zone.leclub_momo_zone.zone_id

  alias {
    name                   = aws_cloudfront_distribution.leclub_momo_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.leclub_momo_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_alias" {
  name    = "www.${var.domain_name}"
  type    = "A"
  zone_id = aws_route53_zone.leclub_momo_zone.zone_id

  alias {
    name                   = aws_cloudfront_distribution.leclub_momo_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.leclub_momo_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

####################
# Cloudfront
####################

resource "aws_acm_certificate" "leclub_momo_certificate" {
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"
}

resource "aws_acm_certificate_validation" "leclub_momo_certificate_validation" {
  certificate_arn         = aws_acm_certificate.leclub_momo_certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.validation_records : record.fqdn]
}

resource "aws_cloudfront_distribution" "leclub_momo_distribution" {
  enabled = true
  aliases = [var.domain_name, "www.${var.domain_name}"]

  default_cache_behavior {
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    target_origin_id       = aws_s3_bucket_website_configuration.root_bucket_site_config.website_endpoint
  }

  default_root_object = "index.html"

  origin {
    origin_id   = aws_s3_bucket_website_configuration.root_bucket_site_config.website_endpoint
    domain_name = aws_s3_bucket_website_configuration.root_bucket_site_config.website_endpoint

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
      origin_protocol_policy = "http-only"
    }
  }

  is_ipv6_enabled = true

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.leclub_momo_certificate.arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  wait_for_deployment = false
}

####################
# S3 Buckets
####################

resource "aws_s3_bucket_policy" "root_readonly" {
  bucket = aws_s3_bucket.root_bucket.id
  policy = jsonencode({
    Statement = {
      Action    = ["s3:GetObject"]
      Effect    = "Allow"
      Principal = "*"
      Resource  = "${aws_s3_bucket.root_bucket.arn}/*"
    }
  })
}

resource "aws_s3_bucket_policy" "www_readonly" {
  bucket = aws_s3_bucket.www_bucket.id
  policy = jsonencode({
    Statement = {
      Action    = ["s3:GetObject"]
      Effect    = "Allow"
      Principal = "*"
      Resource  = "${aws_s3_bucket.www_bucket.arn}/*"
    }
  })
}

resource "aws_s3_bucket" "root_bucket" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_website_configuration" "root_bucket_site_config" {
  bucket = aws_s3_bucket.root_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "root_allow_public_read" {
  bucket              = aws_s3_bucket.root_bucket.id
  block_public_acls   = false
  block_public_policy = false
}

resource "aws_s3_bucket" "www_bucket" {
  bucket = "www.${var.domain_name}"
}

resource "aws_s3_bucket_website_configuration" "www_bucket_site_config" {
  bucket = aws_s3_bucket.www_bucket.id
  redirect_all_requests_to {
    host_name = aws_s3_bucket_website_configuration.root_bucket_site_config.website_endpoint
    protocol  = "https"
  }
}

resource "aws_s3_bucket_public_access_block" "www_allow_public_read" {
  bucket              = aws_s3_bucket.www_bucket.id
  block_public_acls   = false
  block_public_policy = false
}

####################
# Shop Lambda
####################

resource "aws_iam_role" "shop_lambda_role" {
  name = "shop-lambda-role"
  assume_role_policy = jsonencode({
    Statement = {
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Action : ["sts:AssumeRole"]
    }
  })
}

data "archive_file" "shop_lambda_zip" {
  type        = "zip"
  source_dir  = "./shop-lambda/src"
  output_path = "./shop-lambda.zip"
}

resource "aws_lambda_function" "shop_lambda" {
  function_name = "Suzuri-shop-lambda"
  description   = "Lambda function to get items from Suzuri shop"
  filename      = "./shop-lambda.zip"
  handler       = "index.handler"
  role          = aws_iam_role.shop_lambda_role.arn

  memory_size = 1024
  timeout     = 15

  environment {
    variables = {
      SUZURI_TOKEN = var.suzuri_token
    }
  }

  runtime = "nodejs18.x"
}

resource "aws_lambda_permission" "api_gatway_shop_lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.shop_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.shop_api_gateway.execution_arn}/*/*"
}

####################
# Shop API Gateway
####################

resource "aws_api_gateway_rest_api" "shop_api_gateway" {
  name        = "shop-api-gateway"
  description = "API gateway for requests to leclub momo shop"
}

resource "aws_api_gateway_resource" "shop_proxy" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  parent_id   = aws_api_gateway_rest_api.shop_api_gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "shop_proxy" {
  rest_api_id      = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id      = aws_api_gateway_resource.shop_proxy.id
  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "proxy_lambda" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id = aws_api_gateway_resource.shop_proxy.id
  http_method = aws_api_gateway_method.shop_proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.shop_lambda.invoke_arn
}

resource "aws_api_gateway_method" "options" {
  rest_api_id   = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id   = aws_api_gateway_resource.shop_proxy.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id = aws_api_gateway_resource.shop_proxy.id
  http_method = aws_api_gateway_method.options.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" : jsonencode({
      statusCode = 200
    })
  }
}

resource "aws_api_gateway_integration_response" "options_response" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id = aws_api_gateway_resource.shop_proxy.id
  http_method = aws_api_gateway_method.options.http_method
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = "'https://leclubmomo.cc'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET, OPTIONS'"
    "method.response.header.Access-Control-Allow-Headers" = "'*'"
  }

  response_templates = {
    "application/json" = jsonencode({
      "statusCode" = 200
    })
  }

  depends_on = [aws_api_gateway_integration.options, aws_api_gateway_method_response.options_response]
}

resource "aws_api_gateway_method_response" "options_response" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  resource_id = aws_api_gateway_resource.shop_proxy.id
  http_method = "OPTIONS"
  status_code = 200

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_deployment" "shop_api_gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.shop_api_gateway.id
  stage_name  = "v1"

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [aws_lambda_function.shop_lambda]
}

resource "aws_api_gateway_usage_plan" "usage_plan" {
  name = "General rate limits"
  api_stages {
    api_id = aws_api_gateway_rest_api.shop_api_gateway.id
    stage  = aws_api_gateway_deployment.shop_api_gateway_deployment.stage_name
  }

  throttle_settings {
    burst_limit = 100
    rate_limit  = 100
  }
}

resource "aws_api_gateway_api_key" "usage_key" {
  name = "suzuri-shop-key"
}

resource "aws_api_gateway_usage_plan_key" "usage_plan_key" {
  usage_plan_id = aws_api_gateway_usage_plan.usage_plan.id
  key_id        = aws_api_gateway_api_key.usage_key.id
  key_type      = "API_KEY"
}
