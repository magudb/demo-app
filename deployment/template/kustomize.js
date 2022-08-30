import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch', 'main'),
};

const kustomization = (params) =>({
    "apiVersion": "kustomize.toolkit.fluxcd.io/v1beta2",
    "kind": "Kustomization",
    "metadata": {
        "name": `${params.product}-${params.branch}`,
        "namespace": "flux-system"
    },
    "spec": {
        "interval": "5m0s",
        "path": `./features/${params.product}-${params.branch}`,
        "prune": true,
        "sourceRef": {
            "kind": "GitRepository",
            "name": `${params.product}-${params.branch}`
        },
        "targetNamespace": "default"
    }
})

write(kustomization(params), `features/${params.product}-${params.branch}-kustomization.yaml`);
