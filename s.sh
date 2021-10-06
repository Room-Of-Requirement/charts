#!/bin/bash

HELM_VERSION="v3.7.0"
HELM_BINARY="linux-amd64"

CT_VERSION="3.4.0"
CT_BINARY="linux_amd64"

YQ_VERSION="v4.13.3"
YQ_BINARY="yq_linux_amd64"

curl -Ls "https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3" | bash

curl -LOs "https://github.com/helm/chart-testing/releases/download/v${CT_VERSION}/chart-testing_${CT_VERSION}_${CT_BINARY}.tar.gz"
tar -xvf "./chart-testing_${CT_VERSION}_${CT_BINARY}.tar.gz"

curl -LOs "https://github.com/mikefarah/yq/releases/download/${YQ_VERSION}/${YQ_BINARY}.tar.gz"
tar -xvf "./${YQ_BINARY}.tar.gz"

for chart in $(./ct --config .github/ct.yaml list-changed)
do
    version="$(grep '^version:' "$chart/Chart.yaml" | awk '{print $2}' | awk -F '[.\"]' '{$NF = $NF + 1;} 1' | sed 's/ /./g')"
    ./${YQ_BINARY} eval --inplace ".version=\"$version\"" "$chart/Chart.yaml"
done
