# Exercise 5.04
I will try to describe why Rancher is "better" than OpenShift from the following perspectives:

- Community support: Rancher is open-source, which means users can ask questions and discuss potential solutions in Rancher's user community when they encounter problems. Although OpenShift also has open-source versions, it does not have strong communiy support but relies more on documentation. Although OpenShift provides custom support to subscribed users, it is not helpful for individual developers who use OpenShift clusters maintained by their organizations. I used CSC Rahti 
(an OpenShift cluster maintained by CSC) last year, and when I had some problems with the cluster, I could not find solutions elsewhere but from the CSC Rahti maintainers. 

- Vendor lock-in: Rancher management tools and vanilla Kubernetes are decoupled, and it provides a clean uninstall process, which means the users
can switch to other options once their requirements change. OpenShift is more like a "processing plant" of open-source solutions. It modifies these open-source solutions and ships them as a proprietary solution. As a result, once users decide to use OpenShift, it may be very difficult to switch back to vanilla Kubernetes. 

- Supported Kubernetes versions: Rancher does not modify the vanilla Kubernetes quite much, so it can closely follow up the newest Kubernetes version.
OpenShift, as mentioned above, applies many modifications to the vanilla Kubernetes to make it more suitable for enterprise use. As a result,
its updates may be slower. As a developer, I appreciate the quick follow-up of Rancher because it allows me to explore the newest features
of Kubernetes. 

- Management of multiple clusters: Rancher is designed for multi-cluster management, and it provides a single management control plane to manage multiple clusters. 
OpenShift is originally designed for managing a single cluster. Although it has provided the feature of multi-cluster management recently, its usability is still an open question without long-term user experience. 

- Lightweight: Rancher is lighter than OpenShift. As a platform dedicated to enterprise users, OpenShift tries to include all the elements enterprises need, making it heavier and not very suitable for small companies with resource constraints. 
