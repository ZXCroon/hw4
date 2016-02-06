from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def go():
    return render_template('index.html')

app.run(port=80)