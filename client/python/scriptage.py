import pandas as pd
import json
import pickle
import numpy as np
import sys
from sklearn.metrics import r2_score

def age_estim(data_json, dico):
    try:
        data = json.loads(data_json)

        df = pd.DataFrame(data)
        X = df[['haut_tronc', 'tronc_diam', 'fk_stadedev', 'clc_nbr_diag', 'fk_nomtech', 'haut_tot']]
        Y = df[['age_estim']]

        X['fk_stadedev'] = pd.DataFrame(dico["encoder"].transform(X[['fk_stadedev']]))
        X['fk_nomtech'] = pd.DataFrame(dico["encoderlabel"].transform(X[['fk_nomtech']]))
        X = dico["scaler_feature"].transform(X)

        pred = dico["RandomForest"].predict(X)
        pred = pred.reshape(-1, 1)
        pred = dico["scaler_age"].inverse_transform(pred)

        df['age_estim'] = pred
        #renvoie tout le dataframe formaté en json
        age_estimated_json = df.to_json(orient='records')





        # Écriture du résultat dans un fichier JSON


        print(age_estimated_json)
    except Exception as e:
        print("Error in age_estim:", str(e))
        raise

def main():
    data_file_path = sys.argv[1]
    with open(data_file_path, 'r') as f:
        data_json = f.read()
    with open("../python/bocal.pkl", "rb") as f:
        dico = pickle.load(f)
    age_estim(data_json, dico)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise ValueError("Usage: python scriptage.py <data_file_path>")

    main()
