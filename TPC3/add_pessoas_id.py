import json

with open('datasets/dataset-extra1.json', encoding='utf-8') as f:
    data = json.load(f)

    for index, p in enumerate(data['pessoas']):
        p['id'] = "p" + str(index)
    
with open('datasets/dataset-extra1.json', "w", encoding='utf-8') as f:
    json.dump(data, f)
