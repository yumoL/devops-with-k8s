# Exercise 4.03
The query can be `count(kube_pod_info{namespace="prometheus",created_by_kind="StatefulSet"}) by (created_by_kind)`
