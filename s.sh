#!/bin/bash

wget https://github.com/helm/chart-testing/releases/download/v3.4.0/chart-testing_3.4.0_linux_amd64.tar.gz
tar -xvf ./chart-testing_3.4.0_linux_amd64.tar.gz

for chart in $(./ct --config .github/ct.yaml list-changed)
do
    sed -i \"s/^version:.*/version: $(grep '^version:' "$chart/Chart.yaml" | awk '{print $2}' | awk -F '[.\"]' '{$NF = $NF + 1;} 1' | sed 's/ /./g')/\" "$chart/Chart.yaml"
done
