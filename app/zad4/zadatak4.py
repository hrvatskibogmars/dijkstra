import networkx as nx
import csv

G=nx.MultiGraph()

G = nx.read_edgelist("../data/tocke.txt",delimiter=",", nodetype=str, data=(('weight',int),))
data =  (nx.all_pairs_dijkstra_path_length(G))

x = []
for key in sorted(data):
    #print "%s: %s" % (key, data[key])
    x.append(data[key])

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
