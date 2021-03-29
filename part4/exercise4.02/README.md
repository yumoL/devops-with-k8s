# Notes

For testing purpose, I used JMeter to send concurrent requests. 
![](https://github.com/yumoL/devops-with-k8s/blob/master/part3/screenshots/hpa.png)

During the autoscaling of the backend pods, I encounterd a multi-attach error that complained that the volume had been already attached by another existing pod. I thought the reason is that GKE's default filesystem does not support ReadWriteMany so I decided to use an NFS by following the [guide](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
