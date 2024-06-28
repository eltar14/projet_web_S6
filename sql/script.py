import pandas as pd
# Data_Arbre csv doit absolument être dans le même dossier que le script
# File paths
input_file = 'Data_Arbre.csv'
output_file = 'insert_data.sql'

# Load the CSV file
df = pd.read_csv(input_file,encoding='utf-8')



with open(output_file, 'w',encoding='utf-8') as sql_file:
    dict_etat = {etat: i+1 for i, etat in enumerate(df['fk_arb_etat'].unique())}
    dict_stadedev = {stadedev: i+1 for i, stadedev in enumerate(df['fk_stadedev'].unique())}
    dict_port = {port: i+1 for i, port in enumerate(df['fk_port'].unique())}
    dict_pied = {pied: i+1 for i, pied in enumerate(df['fk_pied'].unique())}
    dict_situation = {situation: i+1 for i, situation in enumerate(df['fk_situation'].unique())}
    dict_nomtech = {nomtech: i+1 for i, nomtech in enumerate(df['fk_nomtech'].unique())}
    dict_villeca = {villeca: i+1 for i, villeca in enumerate(df['villeca'].unique())}
    dict_feuillage = {feuillage: i+1 for i, feuillage in enumerate(df['feuillage'].unique())}
    dict_quartier = {quartier: i+1 for i, quartier in enumerate(df['clc_quartier'].unique())}

    for etat in dict_etat:
        sql_file.write(f"INSERT INTO etat (arb_etat) VALUES (\"{etat}\");\n")
    sql_file.write("\n")

    for stadedev in dict_stadedev:
        sql_file.write(f"INSERT INTO stadedev (stadedev) VALUES (\"{stadedev}\");\n")
    sql_file.write("\n")

    for port in dict_port:
        sql_file.write(f"INSERT INTO port (port) VALUES (\"{port}\");\n")
    sql_file.write("\n")

    for pied in dict_pied:
        sql_file.write(f"INSERT INTO pied (pied) VALUES (\"{pied}\");\n")
    sql_file.write("\n")

    for situation in dict_situation:
        sql_file.write(f"INSERT INTO situation (situaton) VALUES (\"{situation}\");\n")
    sql_file.write("\n")

    for nomtech in dict_nomtech:
        sql_file.write(f"INSERT INTO nomtech (nomtech) VALUES (\"{nomtech}\");\n")
    sql_file.write("\n")

    for villeca in dict_villeca:
        sql_file.write(f"INSERT INTO villeca (villeca) VALUES (\"{villeca}\");\n")
    sql_file.write("\n")

    for feuillage in dict_feuillage:
        sql_file.write(f"INSERT INTO feuillage (feuillage) VALUES (\"{feuillage}\");\n")
    sql_file.write("\n")

    for quartier in dict_quartier:
        sql_file.write(f"INSERT INTO quartier (clc_quartier) VALUES (\"{quartier}\");\n")
    sql_file.write("\n")

    dict_secteur = {secteur: i+1 for i, secteur in enumerate(df['clc_secteur'].unique())}
    for secteur in dict_secteur:
        quartier = df[df['clc_secteur'] == secteur]['clc_quartier'].unique()
        id_quartier = [dict_quartier[quart] for quart in quartier]    
        for id_quartier in id_quartier:
            sql_file.write(f"INSERT INTO secteur(clc_secteur,id_quartier) VALUES (\"{secteur}\", {id_quartier});\n")
    sql_file.write("\n")

    values_list = []
    for _, row in df.iterrows():
        values = [
            row['latitude'], row['longitude'], row['haut_tot'], row['haut_tronc'], row['tronc_diam'],1 if row['fk_revetement'] ==  "Oui" else 0,row['clc_nbr_diag'],  
            1 if row['remarquable'] == "Oui"else 0,dict_etat[row['fk_arb_etat']], 
            dict_stadedev[row['fk_stadedev']], dict_port[row['fk_port']], 
            dict_pied[row['fk_pied']], dict_situation[row['fk_situation']], 
            dict_nomtech[row['fk_nomtech']], 
            dict_villeca[row['villeca']], dict_secteur[row['clc_secteur']], 
            dict_feuillage[row['feuillage']]
        ]
        values_str = ', '.join(str(value) for value in values)
        values_list.append(f"({values_str})")
    values_joined = ',\n'.join(values_list)

    sql_file.write("INSERT INTO arbre (latitude, longitude, haut_tot, haut_tronc, tronc_diam,revetement,clc_nbr_diag,remarquable,id_etat,id_stadedev, id_port, id_pied, id_situation, id_nomtech, id_villeca,id_secteur, id_feuillage)\n")
    sql_file.write(f"VALUES\n{values_joined};\n")
