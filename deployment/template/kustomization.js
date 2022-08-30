

import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
    product: param.String('product', 'appname'),
    branch: param.String('branch'),
};

const kustomization = (params) =>({"apiVersion":"kustomize.config.k8s.io/v1beta1","kind":"Kustomization","resources":["hpa.yaml","deployment.yaml","service.yaml","ingress.yaml"]})
write(kustomization(params), `fleet-infra/clusters/kube-local/features/${params.product}-${params.branch}/kustomization.yaml`);


