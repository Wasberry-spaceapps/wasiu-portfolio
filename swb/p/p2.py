import streamlit as st
import pandas as pd
from textblob import TextBlob

st.title("🌿 Customer Feedback Sentiment Analysis")

# Mock reviews
reviews = [
    "The lavender tea is absolutely amazing! Love it.",
    "Product arrived damaged, very disappointed.",
    "Great quality herbs, will buy again!",
    "Packaging could be better but product is good.",
    "Not worth the price, expected more."
]

def analyze_sentiment(text):
    score = TextBlob(text).sentiment.polarity
    if score > 0.1: return "Positive"
    elif score < -0.1: return "Negative"
    else: return "Neutral"

# Analyze
data = pd.DataFrame({
    'Review': reviews,
    'Sentiment': [analyze_sentiment(r) for r in reviews]
})

# Display
st.subheader("Sentiment Distribution")
sentiment_counts = data['Sentiment'].value_counts()
st.bar_chart(sentiment_counts)

st.subheader("All Reviews")
st.dataframe(data)

# Summary
pos = len(data[data['Sentiment']=='Positive'])
st.metric("Positive Reviews", f"{pos}/{len(reviews)}")