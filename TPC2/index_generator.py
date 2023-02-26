
output = open("index.html", "w+", encoding="utf-8")


pagWeb = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Index</title>
    </head>
    <body>
        <h1>Index</h1>
        <!-- Lista com o índice -->
        <ul>
"""

for i in range(1,123):
    pagWeb += """
            <li>
                <a href="""
    
    pagWeb += "\"" + str(i) + "\""

    pagWeb += """>arq"""
    
    pagWeb += str(i)
    
    pagWeb += """.xml</a> 
            </li>
    """

pagWeb += """
        </ul>
    </body>
</html>
"""

output.write(pagWeb)
