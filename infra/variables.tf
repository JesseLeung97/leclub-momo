variable "common_tags" {
  description = "Tags applied to all objects created for leclub momo"
  default = {
    IsTerraformManaged = "true"
    Project            = "leclubmomo"
  }
}

variable "domain_name" {
  description = "The FQDN for leclub momo"
  type        = string
}

variable "suzuri_token" {
  description = "Token used to call Suzuri API"
  type        = string
}
