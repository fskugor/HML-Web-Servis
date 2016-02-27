# HML Web servis
Servis za pretragu baze podataka HRVATSKOG MORFOLOŠKOG LEKSIKONA

* lemma - lema riječi
* token - oblik riječi
* msd - morfosintaktički opis riječi po  [MULTEXT EAST v.4 specifikaciji za Hrvatski jezik](http://nl.ijs.si/ME/V4/msd/html/msd-hr.html)


## API
1. Prima upite preko query stringa.
2. Vraća odgovor u JSON formatu.

### Vrste upita

**Bez parametara:**

* */count?lemmas* - vraća broj lema u obliku: {"count_lemmas": 46397}.

* */count?tokens* - vraća broj tokena u obliku: {"count_tokens": 2221736}.

* */lemmas* - vraća sve leme.


**Trojke sa jednim parametrom:**

* */triples?lemma=:lemma* - vraća sve trojke za danu lemu. npr. */triples?lemma=zločin*
  * *{"triples": [["zločin", "zločin", "Ncmsa--n"], ["zločin", "zločin", "Ncmsn"], ["zločin", "zločina", "Ncmpg"], ["zločin", "zločina", "Ncmsg"], ["zločin", "zločine", "Ncmpa"], ["zločin", "zločine", "Ncmsv"], ["zločin", "zločini", "Ncmpn"], ["zločin", "zločini", "Ncmpv"], ["zločin", "zločinima", "Ncmpd"], ["zločin", "zločinima", "Ncmpi"], ["zločin", "zločinima", "Ncmpl"], ["zločin", "zločinom", "Ncmsi"], ["zločin", "zločinu", "Ncmsd"], ["zločin", "zločinu", "Ncmsl"]]}*
  

* */triples?token=:token* - vraća sve trojke za dani token. npr. */triples?token=zločina*
  * *{"triples": [["zločin", "zločina", "Ncmpg"], ["zločin", "zločina", "Ncmsg"]]}*

* */triples?msd=:msd* - vraća sve trojke za dani msd u istom obliku kao i kod ostalih trojki.


**Trojke sa više parametara:**

* */triples?lemma=:lemma&token=:token&msd=:msd* vraća sve trojke za dani msd, token i lemu.

* Na isti način funkcionira i samo sa 2 parametra u bilo kojoj kombinaciji


**Trojke sa više parametara iste vrste**

* */triples?lemmas=:lemma1,:lemma2, …, :lemman&group=:group*  npr. */triples?lemmas=avion,čekić* - vraća sve trojke danih lemma sa grupiranjem(istaknute leme):
  * *{"triples": {**"avion"**: [["avion", "avion", "Ncmsa--n"], ["avion", "avion", "Ncmsn"], ["avion", "aviona", "Ncmpg"], ["avion", "aviona", "Ncmsg"], ["avion", "avione", "Ncmpa"], ["avion", "avione", "Ncmsv"], ["avion", "avioni", "Ncmpn"], ["avion", "avioni", "Ncmpv"], ["avion", "avionima", "Ncmpd"], ["avion", "avionima", "Ncmpi"], ["avion", "avionima", "Ncmpl"], ["avion", "avionom", "Ncmsi"], ["avion", "avionu", "Ncmsd"], ["avion", "avionu", "Ncmsl"]], **"čekić"**: [["čekić", "čekić", "Ncmsa--n"], ["čekić", "čekić", "Ncmsn"], ["čekić", "čekić", "Nu-sr"], ["čekić", "čekića", "Ncmpg"], ["čekić", "čekića", "Ncmsg"], ["čekić", "čekića", "Nu-pg"], ["čekić", "čekića", "Nu-sa"], ["čekić", "čekića", "Nu-sg"], ["čekić", "čekiće", "Ncmpa"], ["čekić", "čekiće", "Nu-pa"], ["čekić", "čekićem", "Ncmsi"], ["čekić", "čekićem", "Nu-si"], ["čekić", "čekići", "Ncmpn"], ["čekić", "čekići", "Ncmpv"], ["čekić", "čekići", "Nu-pr"], ["čekić", "čekići", "Nu-pv"], ["čekić", "čekićima", "Ncmpd"], ["čekić", "čekićima", "Ncmpi"], ["čekić", "čekićima", "Ncmpl"], ["čekić", "čekićima", "Nu-pd"], ["čekić", "čekićima", "Nu-pi"], ["čekić", "čekićima", "Nu-pl"], ["čekić", "čekiću", "Ncmsd"], ["čekić", "čekiću", "Ncmsl"], ["čekić", "čekiću", "Ncmsv"], ["čekić", "čekiću", "Nu-sd"], ["čekić", "čekiću", "Nu-sl"], ["čekić", "čekiću", "Nu-sv"]]}}*


* */triples?lemmas=avion,čekić&group=false* - vraća sve trojke danih lemma bez grupiranja:
  * *{"triples": [["avion", "avion", "Ncmsa--n"], ["avion", "avion", "Ncmsn"], ["avion", "aviona", "Ncmpg"], ["avion", "aviona", "Ncmsg"], ["avion", "avione", "Ncmpa"], ["avion", "avione", "Ncmsv"], ["avion", "avioni", "Ncmpn"], ["avion", "avioni", "Ncmpv"], ["avion", "avionima", "Ncmpd"], ["avion", "avionima", "Ncmpi"], ["avion", "avionima", "Ncmpl"], ["avion", "avionom", "Ncmsi"], ["avion", "avionu", "Ncmsd"], ["avion", "avionu", "Ncmsl"], ["čekić", "čekić", "Ncmsa--n"], ["čekić", "čekić", "Ncmsn"], ["čekić", "čekić", "Nu-sr"], ["čekić", "čekića", "Ncmpg"], ["čekić", "čekića", "Ncmsg"], ["čekić", "čekića", "Nu-pg"], ["čekić", "čekića", "Nu-sa"], ["čekić", "čekića", "Nu-sg"], ["čekić", "čekiće", "Ncmpa"], ["čekić", "čekiće", "Nu-pa"], ["čekić", "čekićem", "Ncmsi"], ["čekić", "čekićem", "Nu-si"], ["čekić", "čekići", "Ncmpn"], ["čekić", "čekići", "Ncmpv"], ["čekić", "čekići", "Nu-pr"], ["čekić", "čekići", "Nu-pv"], ["čekić", "čekićima", "Ncmpd"], ["čekić", "čekićima", "Ncmpi"], ["čekić", "čekićima", "Ncmpl"], ["čekić", "čekićima", "Nu-pd"], ["čekić", "čekićima", "Nu-pi"], ["čekić", "čekićima", "Nu-pl"], ["čekić", "čekiću", "Ncmsd"], ["čekić", "čekiću", "Ncmsl"], ["čekić", "čekiću", "Ncmsv"], ["čekić", "čekiću", "Nu-sd"], ["čekić", "čekiću", "Nu-sl"], ["čekić", "čekiću", "Nu-sv"]]}*
 
* Na isti način funkcionira sa tokenima


##INSTALACIJA I KORIŠTENJE

### Preduvjeti
1. Python 3.x
2. Flask za Python3.x (u slučaju korištenja virtualenv nije potrebno instalirati)
3.  Sqlite baza podataka [hml.db](https://drive.google.com/open?id=0B1kUXPROf-eWSzhHd293YjA1SzA)

### Postavljanje i pokretanje u lokalnom okruženju
Ako ne želite dodati flask na vašu postojeću instalaciju python-a onda koristite virtualenv koji će stvoriti odvojenu verziju. 
Upute za instalaciju **virtualenv** se mogu naći na [OVOM LINKU](http://www.tylerbutler.com/2012/05/how-to-install-python-pip-and-virtualenv-on-windows-with-powershell/) 

Sve ostale upute za instalaciju i pokretanje aplikacije se mogu pronaći  [OVDJE](https://blog.openshift.com/how-to-install-and-configure-a-python-flask-dev-environment-deploy-to-openshift/).

 Iako su upute za python 2.6 isto vrijedi i za python 3.x samo je potrebno umjesto `pip` naredbe pisati `pip3`.
 Ako se radi na Windows sustavu u slučaju korištenja virtualenv  potrebno je paziti kod naredbe ispod:
 
  `virtualenv venv --python=python3.x` 

Umjesto python3.x potrebno je upisati cijelu putanju do datoteke kao ispod:

 `virtualenv venv --python=C:\Users\PCName\AppData\Local\Programs\Python\Python35-32\python.exe`

U lokalnom okruženju datoteku baze podataka *hml.db* je moguće postaviti bilo gdje na računalu te u datoteci *wsgi/hmldb.py* dodati putanju:
`self.conn = sqlite3.connect('putanja do datoteke hml.db'+dbname)`

### Postavljanje i pokretanje na openshift-u
1. Registracija na [openshift](https://www.openshift.com/).
2. Postavljanje **rhc**  klijentskog alata za openshift po [OVIM](https://developers.openshift.com/en/getting-started-overview.html) uputama.
3. Stvaranje nove aplikacije (odabrati tip python3.3)
4. Koristiti ovaj repozitorij kao početni kod
5. Po uputama za postavljanje flask aplikacije [Flask Begginer's Guide](https://blog.openshift.com/beginners-guide-to-writing-flask-apps-on-openshift/) postaviti aplikaciju na openshift
6. Datoteku baze podataka je potrebno postaviti u mapu *app-root/repo/data/* na openshift aplikaciji. Te odkomentirati dio koda u *wsgi/hmldb.py*:
`#self.conn=sqlite3.connect(os.path.join(os.environ.get('HOME'),'app-root/repo/data/'+dbname))`

7. Isto tako u datoteci *wsgi/static/funkcije.js* potrebno je promijeniti vrijednost globalne varijable online iz *false* u *true*:
`var online = true;`

### Korištenje aplikacije

Postoje dva načina pretrage koje aplikacija koristi.

1. Pretraga sa **jednim parametrom iste vrste** trojki za danu lemu, token ili msd. 
2. Pretraga sa **više parametara jedne vrste** za dane leme ili tokene uz mogućnost grupiranja rezultata .

Prva pretraga funkcionira na način da upisom lema i/ili tokena i msd-a (dovoljno je upisati jedan parametar) vraća tražene trojke.

Druga pretraga zahtjeva da se odabere vrsta parametara (po lemama ili tokenima). Tu postoji i mogućnost grupiranja.




