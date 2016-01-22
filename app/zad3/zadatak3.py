import networkx as nx
import sys

G=nx.MultiGraph()

G = nx.read_edgelist("tocke.txt",delimiter=",", nodetype=str, data=(('weight',int),))

#Returns the shortest path length from source to target in a weighted graph.
#nx.dijkstra_path_length(G,"Moskva","Rostov")


def print_menu():
    print 30 * "-" , "MENU" , 30 * "-"
    print "1. Calculate distance between two cities"
    print "5. Exit"
    print 67 * "-"

loop=True

while loop:
    print_menu()
    choice = input("Enter your choice [1 || 5]: ")

    if choice==1:
        x = raw_input('Start city? ')
        y = raw_input('End city? ')
        try:
            print nx.dijkstra_path_length(G,x,y)
        except:
            print ("Invalid input")

    elif choice==5:
        loop = False
    else:
        raw_input("Invalid input.")