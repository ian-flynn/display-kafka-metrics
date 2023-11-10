# display-kafka-metrics

In the terminal:
start kafka by runner `docker compose --file docker.yml up`

In a new terminal:
verify containers are up by running `docker ps`
it should list the three brokers and zookeeper

Verify active brokers:
run `docker exec -it zookeeper /bin/zookeeper-shell localhost:2181` to access zookeeper shell
it should say 'Welcome to Zookeeper!' along with other things

get the IDs of current brokers by running `ls /brokers/ids` in the zookeeper shell
should output [1, 2, 3]

hit Ctrl + C to exit zookeeper shell

Kafka is running and waiting for consumers and producers
