from flask import Flask, render_template, request, redirect

app = Flask(__name__)
posts = ["Welcome to Mini-Social!"]

@app.route("/")
def home():
    return render_template("index.html", posts=posts)

@app.route("/add", methods=["POST"])
def add():
    content = request.form.get("content")
    if content:
        posts.append(content)
    return redirect("/")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
