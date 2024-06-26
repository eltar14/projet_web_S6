import pandas as pd
import json
import pickle
import sys

def age_estim(data_json, dico):
    try:
        data = json.loads(data_json)
        print("Data JSON:", data)  # Message de débogage
        df = pd.DataFrame(data)
        X = df[['haut_tronc', 'tronc_diam', 'fk_stadedev', 'clc_nbr_diag', 'fk_nomtech', 'haut_tot']]
        X['fk_stadedev'] = dico["encoder"].transform(X[['fk_stadedev']])
        X['fk_nomtech'] = dico["encoderlabel"].transform(X[['fk_nomtech']])
        X = dico["scaler_feature"].transform(X)

        pred = dico["RandomForest"].predict(X)
        pred = pred.reshape(-1, 1)
        pred = dico["scaler_age"].inverse_transform(pred)

        age_estimated = pd.DataFrame(pred, columns=['age_estim'])
        age_estimated_json = age_estimated.to_json(orient='records')

        return age_estimated_json
    except Exception as e:
        print("Error in age_estim:", str(e))
        raise

def main():
    data_file_path = sys.argv[1]
    with open(data_file_path, 'r') as f:
        data_json = f.read()
    with open("cornichon.pkl", "rb") as f:
        dico = pickle.load(f)
    result = age_estim(data_json, dico)
    print(result)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise ValueError("Usage: python scriptage.py <data_file_path>")

    main()
