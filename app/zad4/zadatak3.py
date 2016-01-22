import networkx as nx
from networkx.readwrite import json_graph
import json
import csv




G=nx.MultiGraph()
#lines = ["Zagreb Ljubljana {'weight':3}", "Berlin Varshava {'weight':27}", "Paris Barcelona {'weight':3}"]
#G = nx.read_edgelist(lines, nodetype=str)
#G.nodes()

#lines= ["Zagreb Ljubljana 3", "Berlin Varshava 5", "Paris Barcelona 5"]

G = nx.read_edgelist("../data/tocke.txt",delimiter=",", nodetype=str, data=(('weight',int),))
data =  (nx.all_pairs_dijkstra_path_length(G))
#print data
x = []
for key in sorted(data):
    #print "%s: %s" % (key, data[key])
    x.append(data[key])
#print x
line = []

for val in x:
    red = []
    for key in sorted(val):
        red.append(val[key])
    line.append(red)

print line
print len(line)

resultFile = open("output.csv",'wb')
wr = csv.writer(resultFile, dialect='excel')
wr.writerow(line)

#nx.write_weighted_edgelist(G, 'test.weighted.edgelist')

#print json_graph.adjacency_graph(data)
#json.dump(data, open('data.json','w'))


#G.add_edge("Berlin","Kijev",weight=40)
#G.add_edge("Berlin","Moskva",weight=30)
#G.add_edge("Kijev","Minsk",weight=1)
#G.add_edge("Kijev","Varshav",weight=100)
#G.add_edge("Minsk","Moskva", weight=2)
#G.add_edge("Moskva","Varshav",weight=10)

#Returns the shortest path length from source to target in a weighted graph.
#print(nx.dijkstra_path_length(G,"Moskva","Rostov"))
#print(nx.all_pairs_dijkstra_path(G))
#print(G.number_of_nodes())

#print(G.node)
#print(G.edge)
#print(G.nodes())
