#!/bin/bash

YQ_VERSION="v4.13.3"
YQ_BINARY="yq_linux_amd64"

curl -LOs "https://github.com/mikefarah/yq/releases/download/${YQ_VERSION}/${YQ_BINARY}.tar.gz"
tar -xvf "./${YQ_BINARY}.tar.gz"

version="$(grep '^version:' "charts/$1/Chart.yaml" | awk '{print $2}' | awk -F '[.\"]' '{$NF = $NF + 1;} 1' | sed 's/ /./g')"
./${YQ_BINARY} eval --inplace ".version=\"$version\"" "charts/$1/Chart.yaml"
