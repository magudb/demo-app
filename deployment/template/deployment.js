
import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch'),
};

const deployment = (params) => ({
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata":
    {
        "name": `${params.product}-${params.branch}`
    },
    "spec":
    {
        "minReadySeconds": 3,
        "progressDeadlineSeconds": 60,
        "revisionHistoryLimit": 5,
        "selector": {
            "matchLabels": {
                "app": `${params.product}-${params.branch}`
            }
        },
        "strategy":
        {
            "rollingUpdate": {
                "maxUnavailable": 0
            },
            "type": "RollingUpdate"
        }, "template":
        {
            "metadata":
            {
                "labels":
                {
                    "app": `${params.product}-${params.branch}`
                }
            }, "spec": {
                "containers":
                    [
                        {
                            "image": `ghcr.io/magudb/${params.product}:${params.branch}`,
                            "imagePullPolicy": "Always",
                            "name": `${params.product}`,
                            "ports": [
                                { "containerPort": 8080, "name": "http", "protocol": "TCP" }
                            ],
                            "resources":
                            {
                                "limits":
                                {
                                    "cpu": "2000m",
                                    "memory": "512Mi"
                                },
                                "requests":
                                {
                                    "cpu": "100m",
                                    "memory": "64Mi"
                                }
                            }
                        }
                    ]
            }
        }
    }
});

write(deployment(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}/deployment.yaml`);
