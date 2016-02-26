# coding: utf-8
import os
from flask import Flask
from flask import render_template
from flask import request
from flask import json
from flask import jsonify
from hmldb import HmlDB

app = Flask(__name__)

# Create our index or root / route

@app.route("/")
@app.route("/index")
def index():
	return render_template("index.html")

# metoda za brojanje, ovisno o poslanom parametru, lemmas ili tokens, vraća njihov broj
@app.route("/count")
def count():
	db = HmlDB('hml.db')
	if 'lemmas' in request.args:
		result = HmlDB.count_lemmas(db)
		return str(json.dumps({'count_lemmas': result}))
	elif 'tokens' in request.args:
		result = HmlDB.count_tokens(db)
		return str(json.dumps({'count_tokens': result}))
	else:
		return str("Greška")

# vraća sve leme
@app.route("/lemmas")
def lemmas():
	db = HmlDB('hml.db')
	result = db.select_lemmas()
	return str(json.dumps({'lemmas': list(result)}, ensure_ascii=False))

""" vraća trojke ovisno o upitu
    trojke su u obliku lemma - token - msd"""

@app.route("/triples")
def triples():
	db = HmlDB('hml.db')
	argsNum = str(request.query_string).count('=')
	"""varijabla argsNum provjerava koliko '=' znakova ima u query stringu
    i na taj način određujemo broj navedenih parametara"""
	if argsNum == 3:
		if 'lemma' in request.args  and 'token' in request.args and 'msd' in request.args:
			lemma = str(request.args.get('lemma'))
			token = str(request.args.get('token'))
			msd = str(request.args.get('msd'))
			result = db.select_any(lemma, token, msd)
		else:
			result = 'Greška'
	elif argsNum == 2:
		if 'lemma' in request.args and 'msd' in request.args:
			lemma = str(request.args.get('lemma'))
			msd = str(request.args.get('msd'))
			result = db.select_any(lemma, None, msd)
		elif 'lemma' in request.args and 'token' in request.args:
			lemma = str(request.args.get('lemma'))
			token = str(request.args.get('token'))
			result = db.select_any(lemma, token)
		elif 'msd' in request.args and 'token' in request.args:
			msd = str(request.args.get('msd'))
			token = str(request.args.get('token'))
			result = db.select_any(None, token, msd)
		elif 'lemmas' in request.args and 'group' in request.args:
			lemmas = str(request.args.get('lemmas'))
			lemmasParse = lemmas.replace(' ', '').split(',')
			group = str(request.args.get('group'))
			if(group == 'false'):
				result = db.select_by_lemmas(lemmasParse, False)
			else:
				result = db.select_by_lemmas(lemmasParse)
		elif 'tokens' in request.args and 'group' in request.args:
			tokens = str(request.args.get('tokens'))
			tokensParse = tokens.replace(' ', '').split(',')
			group = str(request.args.get('group'))
			if(group == 'false'):
				result = db.select_by_tokens(tokensParse, False)
			else:
				result = db.select_by_tokens(tokensParse)
		else:
			result = 'Greška'
	elif argsNum == 1:
		if 'msd' in request.args:
			msd = str(request.args.get('msd'))
			result = db.select_by_msd(msd)
		elif 'lemma' in request.args:
			lemma = str(request.args.get('lemma'))
			result = db.select_by_lemma(lemma)
		elif 'token' in request.args:
			token = str(request.args.get('token'))
			result = db.select_by_token(token)
		elif 'lemmas' in request.args:
			lemmas = str(request.args.get('lemmas'))
			lemmasParse = lemmas.replace(' ', '').split(',')
			result = db.select_by_lemmas(lemmasParse)
		elif 'tokens' in request.args:
			tokens = str(request.args.get('tokens'))
			tokensParse = tokens.replace(' ', '').split(',')
			result = db.select_by_tokens(tokensParse)
		else:
			result = 'Greška'
	else:
		result = 'Greška'

	if result != 'Greška':
		return str(json.dumps({'triples' : result}, ensure_ascii=False)) #vraća rezultat u json formatu
		                                                                 #dodati pravi JSON response koji sadržavav Content-Type JSON
	else:
		return (result)
if __name__ == "__main__":
	app.run(debug = "True")




