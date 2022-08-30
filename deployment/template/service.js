import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch'),
};
const service = (params)=>({
    "apiVersion": "v1",
    "kind": "Service",
    "metadata": {
        "name": `${params.product}-${params.branch}`
    },
    "spec": {
        "ports": [
            {
                "name": "http",
                "port": 8080,
                "protocol": "TCP",
                "targetPort": "http"
            }
        ],
        "selector": {
            "app": `${params.product}-${params.branch}`
        },
        "type": "LoadBalancer"
    }
})

write(service(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}/service.yaml`);
