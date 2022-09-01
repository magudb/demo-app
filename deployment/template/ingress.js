
import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch', 'main'),
};
const ingress = (params)=>({
    "apiVersion": "networking.k8s.io/v1",
    "kind": "Ingress",
    "metadata": {
        "annotations": {
            "ingress.kubernetes.io/rewrite-target": "/",
            "nginx.ingress.kubernetes.io/canary": "true",
            "nginx.ingress.kubernetes.io/canary-by-header": "x-branch",
            "nginx.ingress.kubernetes.io/canary-by-header-value": `${params.branch}`
        },
        "labels":{
            "app": `${params.product}`
        },        
        "namespace": "default",
        "name": `${params.product}-${params.branch}`
    },
    "spec": {
        "ingressClassName": "nginx",
        "rules": [
            {
                "host": "377c0f17-854e-4a1b-863d-a1b685ae2ef7.lb.civo.com",
                "http": {
                    "paths": [
                        {
                            "backend": {
                                "service": {
                                    "name": `${params.product}-${params.branch}`,
                                    "port": {
                                        "number": 8080
                                    }
                                }
                            },
                            "path": "/",
                            "pathType": "Prefix"
                        }
                    ]
                }
            }
        ]
    }
})
write(ingress(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}/ingress.yaml`);
