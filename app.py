from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

app.config['FLASK_DEBUG'] = 1


@app.route('/')
def index():
    return redirect(url_for('menu'))


@app.route('/menu')
def menu():
    record = request.args.get('record', type=int)
    return render_template("menu.html", record=record)


@app.route('/win')
def win():
    score = request.args.get('score', type=int)
    record = request.args.get('record', type=int)
    return render_template("win.html", score=score, record=record)


@app.route('/lose')
def lose():
    score = request.args.get('score', type=int)
    record = request.args.get('record', type=int)
    return render_template("lose.html", score=score, record=record)


@app.route('/proj')
def proj():
    return render_template('proj.html')


if __name__ == '__main__':
    app.run(debug=True)
    # app.run()
