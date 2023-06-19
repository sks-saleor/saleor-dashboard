
include .env

export PROJECT_NAME=sks-saleor
export STOREFRONT_VERSION=latest
export DJANGO_VERSION=latest
export DASHBOARD_VERSION=latest

DB_CONTAINER_NAME=postgres

.PHONY: up build down ps logs backup restore backups

## help	:	Print commands help.
help : Makefile
	@sed -n 's/^##//p' $<

## aws-upload:	Start to sync upload SQL backup to S3.
aws-upload:
	@aws s3 sync build/dashboard s3://cdn.titancenter.asia/dashboard/static/ --profile default-cdn.titancenter.asia
	@aws s3 cp build/dashboard/index.html s3://cdn.titancenter.asia/ --profile default-cdn.titancenter.asia

## build:	You should build your tests to provide the highest level of code coverage.
build:
	@echo "storefront-build storefront image for storefront..."
	@npm run build
	$(MAKE) aws-upload

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
