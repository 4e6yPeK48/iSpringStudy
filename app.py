from flask import Flask, render_template

app = Flask(__name__)

app.config['FLASK_DEBUG'] = 1


@app.route('/')
def nothing():
    return "Hello world!"


@app.route('/world')
def world():
    return render_template("world.html")


@app.route('/game')
def game():
    return render_template("game.html")


@app.route('/proj')
def proj():
    return render_template('proj.html')


if __name__ == '__main__':
    app.run()
