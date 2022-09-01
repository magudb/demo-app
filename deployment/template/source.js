import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch', 'main'),
};

const kustomization = (params) =>({
    "apiVersion": "source.toolkit.fluxcd.io/v1beta2",
    "kind": "GitRepository",
    "metadata": {
        "name": `${params.product}-${params.branch}`,
        "namespace": "flux-system"
    },
    "spec": {
        "interval": "1m0s",
        "path": `./clusters/kube-local/features/${params.product}-${params.branch}`,
        "ref": {
          "branch": "main"
        },
        "url": "ssh://git@github.com/magudb/fleet-infra"
    }
})

write(kustomization(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}-source.yaml`);
