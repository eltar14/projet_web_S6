
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, davies_bouldin_score, calinski_harabasz_score
from sklearn.ensemble import IsolationForest
import plotly.express as px
import plotly.graph_objects as go
import sys
import json

def clustering(data_json, nbcluster):
    data_arbre = pd.DataFrame(json.loads(data_json))

    pertinent_col = ['longitude', 'latitude', 'haut_tot', 'tronc_diam', 'age_estim', 'haut_tronc']
    data_arbre_reduit = data_arbre[pertinent_col].dropna()

    X = data_arbre_reduit[['haut_tot']].values

    kmeans = KMeans(n_clusters=nbcluster, random_state=0, init='k-means++', n_init=10, max_iter=300).fit(X)
    data_arbre_reduit['cluster'] = kmeans.labels_

    score_silhouette = silhouette_score(X, kmeans.labels_)
    score_davies_bouldin = davies_bouldin_score(X, kmeans.labels_)
    score_calinski_harabasz = calinski_harabasz_score(X, kmeans.labels_)

    X_anomalies = data_arbre_reduit[['age_estim', 'haut_tronc', 'tronc_diam']].values
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    data_arbre_reduit['anomaly'] = iso_forest.fit_predict(X_anomalies)

    anomalies = data_arbre_reduit[data_arbre_reduit['anomaly'] == -1]
    nb_anomalies = np.count_nonzero(data_arbre_reduit['anomaly'] == -1)

    cluster_mean_height = data_arbre_reduit.groupby('cluster')['haut_tot'].mean()

    sorted_clusters = cluster_mean_height.sort_values().index
    num_clusters = len(sorted_clusters)

    if num_clusters == 2:
        num_small = 1
        num_medium = 0
        num_large = 1
    else:
        num_small = num_clusters // 3
        num_large = num_clusters // 3
        num_medium = num_clusters - (num_small + num_large)

    cluster_names = {}
    for i, cluster in enumerate(sorted_clusters):
        if i < num_small:
            cluster_names[cluster] = 'petit'
        elif i < num_small + num_medium:
            cluster_names[cluster] = 'moyen'
        else:
            cluster_names[cluster] = 'grand'

    data_arbre_reduit['cluster_name'] = data_arbre_reduit['cluster'].map(cluster_names)

    fig = px.scatter_mapbox(data_arbre_reduit, lat="latitude", lon="longitude",
                            color='cluster_name',
                            size="tronc_diam",
                            hover_data=["haut_tot", "tronc_diam", "age_estim", "haut_tronc"],
                            size_max=15, zoom=12, mapbox_style="carto-positron")

    anomalies = data_arbre_reduit[data_arbre_reduit['anomaly'] == -1]
    fig.add_trace(go.Scattermapbox(
        lat=anomalies['latitude'],
        lon=anomalies['longitude'],
        mode='markers',
        marker=go.scattermapbox.Marker(
            size=9,
            color='black'
        ),
        text=["Anomalie"] * len(anomalies),
        textposition="top right",
        hoverinfo='text',
        name="Anomalies"
    ))

    for index, row in anomalies.iterrows():
        fig.add_trace(go.Scattermapbox(
            lat=[row['latitude']],
            lon=[row['longitude']],
            mode='text',
            text=["Anomalie"],
            textposition="top right",
            showlegend=False,
            textfont=dict(color="red", size=12)
        ))

    fig.update_layout(
        title="Visualisation des Clusters et des Anomalies",
        legend=dict(
            yanchor="top",
            y=0.99,
            xanchor="left",
            x=0.01,
            bgcolor="rgba(255, 255, 255, 0.7)",
            bordercolor="Black",
            borderwidth=1,
            font=dict(size=10)
        )
    )

    # Enregistrer la figure en tant que fichier HTML
    output_html = "cluster_map.html"
    fig.write_html(output_html)

    return output_html


data_json = sys.argv[1]
nbcluster = int(sys.argv[2])
clustering(data_json, nbcluster)

