# Import BeautifulSoup
from bs4 import BeautifulSoup as bs
content = []
# Read the XML file
with open("files/arq.xml", "r", encoding="utf-8") as file:
    # Read each line in the file, readlines() returns a list of lines
    content = file.readlines()
# Combine the lines in the list into a string
content = "".join(content)
bs_content = bs(content, "xml")


result = bs_content.find_all("ARQELEM")

i=1
for r in result:
    file = open("files/arq" + str(i) + ".xml", "w+", encoding="utf-8")
    file.write("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n")
    file.write(r.prettify())
    #print(r)
    i += 1



