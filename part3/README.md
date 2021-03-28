# Exercise 3.06

I compared DBaaS to PVCs with a database image from the following perspectives:

- Required work:
    - Initialization: I did not find quite much difference from the perspective of initialization. As a cloud service, initializing a database instance on DBaaS is quite simple. For example, when using Google Cloud SQL, a database instance can be initialized with a few clicks: 1) go to the Google Cloud and select the database type, e.g., MySQL and PostgresSQL, 2) enter the necessary information, such as the instance ID and password, and select the region where the database is located. The Google Cloud SQL provides a convenient GUI so that users can follow the instructions step by step. Initializing a database with a database image and PVCs is also simple: create a YAML file and apply it. It is worth noting that users may face some issues when creating the YAML file due to the lack of knowledge of K8s.
    Maintenance: It may be easier to maintain a database instance running on DBaaS for the following reasons: DBaaS usually supports automatic scale. For example, Google Cloud SQL states that it "can automatically scale up storage capacity when you are near your limit" so that users do not need to estimate the storage they need or waste money on the storage they will never use. When using PVCs, users need to set the storage size in the YAML file.
    - Availability: DBaaS usually supports high availability. For example, users can replicate their instances to another region with a click when using Google Cloud API. 
    DBaaS can automatically redirect traffic to a replica in the case of a failure, ensuring instance availability. Unlike DBaaS, which runs outside of the K8s cluster, 
    PVCs and PVs are also parts of the K8s cluster, so the data may be lost once the cluster is down.  
    - Backups: DBaaS usually supports automatic setups so that users do not need to worry about fault tolerance. When using PVCs, users may need to run their own 
    scripts on time to backup the data outside of the K8s cluster.
    
- Cost: Running a database on DBaaS may be more expensive than using PVCs, which is reasonable as users need to pay for the DBaaS experts, who are responsible for
providing the features of easy maintenance, high availability, and automatic backups (as mentioned above). Once a business reaches a specific size, it may be more economical to hire their database experts to build and maintain their database, just like what Google and Amazon do.

- Security: When using DBaaS, users have no direct access to the servers that are running their database, which means they cannot influence the physical security of the servers. As a result, for some organizations that maintain sensitive data, DBaaS may not be an option. 

# Exercise 3.07
I am going to use the Postgres image with PVCs in my project for the following reasons:
- I already have the Postgres image with PVCs that works well on my K8s cluster.
- The project is relatively small, and there is no need for high availability or scalability, so it is unnecessary to use Cloud SQL here. 
