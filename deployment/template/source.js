import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch', 'main'),
};

const source = (params)=>({
    "apiVersion": "source.toolkit.fluxcd.io/v1beta2",
    "kind": "GitRepository",
    "metadata": {
        "name": `${params.product}-${params.branch}`,
        "namespace": "flux-system"
    },
    "spec": {
        "interval": "30s",
        "ref": {
            "branch": "main"
        },
        "url": "ssh://git@github.com/magudb/fleet-infra"
    }
})

write(source(params), `features/${params.product}-${params.branch}-source.yaml`);
