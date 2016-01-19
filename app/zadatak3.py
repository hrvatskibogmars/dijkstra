import networkx as nx
from networkx.readwrite import json_graph
import json



G=nx.Graph()
#lines = ["Zagreb Ljubljana {'weight':3}", "Berlin Varshava {'weight':27}", "Paris Barcelona {'weight':3}"]
#G = nx.read_edgelist(lines, nodetype=str)
#G.nodes()

#lines= ["Zagreb Ljubljana 3", "Berlin Varshava 5", "Paris Barcelona 5"]

G = nx.read_edgelist("tocke.txt",delimiter=",", nodetype=str, data=(('weight',int),))

d = json_graph.node_link_data(G)
json.dump(d, open('data.json','w'))


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
