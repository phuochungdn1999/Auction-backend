from flask import Flask,request
import pandas as pd
import neattext.functions as nfx
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity, linear_kernel
app = Flask(__name__)


@app.route("/")
def hello_world():
    name = request.args['name']
    df = pd.read_csv("./udemy_courses.csv")

    df['clean_course_title'] = df['course_title'].apply(nfx.remove_stopwords)
    df['clean_course_title'] = df['clean_course_title'].apply(nfx.remove_special_characters)

    count_vect = CountVectorizer()
    cv_mat = count_vect.fit_transform(df['clean_course_title'])
    cv_mat.todense()

    df_cv_words = pd.DataFrame(cv_mat.todense(), columns=count_vect.get_feature_names())

    cosine_sim_mat = cosine_similarity(cv_mat)
    course_indices = pd.Series(df.index, index=df['course_title']).drop_duplicates()
    idx = course_indices[name]
    scores = list(enumerate(cosine_sim_mat[idx]))
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)

    selected_course_indices = [i[0] for i in sorted_scores[1:]]
    selected_course_scores = [i[1] for i in sorted_scores[1:]]
    recommended_result = df['course_title'].iloc[selected_course_indices]
    rec_df = pd.DataFrame(recommended_result, columns=['course_title']).head(10).to_json(orient='records')
    # print(rec_df)
    return rec_df

