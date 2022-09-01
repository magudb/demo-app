
import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch'),
};

const hpa = (params)=>({
    "apiVersion": "autoscaling/v2beta2",
    "kind": "HorizontalPodAutoscaler",
    "metadata": {
        "namespace": "default",
        "name": `${params.product}-${params.branch}`
    },
    "spec": {
        "maxReplicas": 1,
        "metrics": [
            {
                "resource": {
                    "name": "cpu",
                    "target": {
                        "averageUtilization": 99,
                        "type": "Utilization"
                    }
                },
                "type": "Resource"
            }
        ],
        "minReplicas": 1,
        "scaleTargetRef": {
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "name": `${params.product}-${params.branch}`
        }
    }
});
write(hpa(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}/hpa.yaml`);
