import type { Chapter } from './chapters';

const c = (
  n: number,
  id: string,
  part: 1 | 2 | 3 | 4,
  icon: string,
  titleEn: string,
  titleFr: string,
  descEn: string,
  descFr: string,
  blocks: Chapter['blocks']
): Chapter => ({ id, number: n, part, icon, titleEn, titleFr, descEn, descFr, blocks });

export const chapters: Chapter[] = [
  // =============== PROLOGUE ===============
  c(0, 'prologue', 1, '📘', 'Prologue — Why Python?', 'Prologue — Pourquoi Python ?',
    'A short manifesto before we dive in.',
    'Un court manifeste avant de plonger.',
    [
      { type: 'p', en: 'Python was created by Guido van Rossum and first released in 1991. Its philosophy emphasizes code readability and a clean, minimal syntax. Today it powers everything from web servers to machine learning, from automation scripts to spacecraft control software.',
              fr: 'Python a été créé par Guido van Rossum et publié pour la première fois en 1991. Sa philosophie met l\'accent sur la lisibilité du code et une syntaxe épurée. Aujourd\'hui, il propulse aussi bien des serveurs web que le machine learning, des scripts d\'automatisation que des logiciels de contrôle de vaisseaux spatiaux.' },
      { type: 'h2', en: 'What makes Python special', fr: 'Ce qui rend Python spécial' },
      { type: 'ul', en: [
        'Readable, almost-English syntax',
        'Batteries included — a huge standard library',
        'Dynamic typing, but strongly typed',
        'Multi-paradigm: OOP, functional, procedural',
        'Massive ecosystem: pip has over 500,000 packages',
        'Cross-platform: Windows, macOS, Linux, even microcontrollers',
      ], fr: [
        'Une syntaxe lisible, presque de l\'anglais',
        'Batteries included — une bibliothèque standard immense',
        'Typage dynamique mais fort',
        'Multi-paradigme : POO, fonctionnel, procédural',
        'Un écosystème massif : pip compte plus de 500 000 paquets',
        'Multiplateforme : Windows, macOS, Linux, et même des microcontrôleurs',
      ]},
      { type: 'quote', en: '"Readability counts." — The Zen of Python', fr: '"La lisibilité compte." — Le Zen de Python' },
      { type: 'h2', en: 'How to read this book', fr: 'Comment lire ce livre' },
      { type: 'p', en: 'Every chapter contains explanations, runnable code samples, tips, exercises, and solutions. Code samples can be copied with one click. The book is divided into four parts; you can jump anywhere using the table of contents, but the chapters are written to be read in order.',
             fr: 'Chaque chapitre contient des explications, des exemples de code exécutables, des astuces, des exercices et des solutions. Les exemples de code peuvent être copiés en un clic. Le livre est divisé en quatre parties ; vous pouvez naviguer librement grâce au sommaire, mais les chapitres sont rédigés pour être lus dans l\'ordre.' },
      { type: 'tip', en: 'Set up a folder on your computer and type every example yourself. Reading is not enough — your fingers need to learn the grammar of the language.',
            fr: 'Créez un dossier sur votre ordinateur et tapez chaque exemple vous-même. Lire ne suffit pas — vos doigts doivent apprendre la grammaire du langage.' },
    ]
  ),

  // =============== CHAPTER 1 — SETUP ===============
  c(1, 'setup', 1, '🛠️', 'Setting Up Your Environment', 'Installer votre environnement',
    'Install Python and your editor, and write your first program.',
    'Installez Python et votre éditeur, puis écrivez votre premier programme.',
    [
      { type: 'p', en: 'Before we can write any Python, we need to install it and pick a tool to write with.',
             fr: 'Avant de pouvoir écrire du Python, il faut l\'installer et choisir un outil pour écrire.' },
      { type: 'h2', en: 'Installing Python', fr: 'Installer Python' },
      { type: 'p', en: 'Go to https://python.org and download the latest stable release (currently 3.12+). On macOS and Linux it is often pre-installed. Verify your install in a terminal:',
             fr: 'Allez sur https://python.org et téléchargez la dernière version stable (actuellement 3.12+). Sur macOS et Linux, Python est souvent déjà installé. Vérifiez votre installation dans un terminal :' },
      { type: 'code', en: `python --version
# or on some systems:
python3 --version`, fr: `python --version
# ou sur certains systèmes :
python3 --version` },
      { type: 'h2', en: 'Choosing an editor', fr: 'Choisir un éditeur' },
      { type: 'p', en: 'A great free editor is Visual Studio Code (VS Code). Install it and add the official "Python" extension by Microsoft. You will get syntax highlighting, autocompletion, debugging, and a built-in terminal.',
             fr: 'Un excellent éditeur gratuit est Visual Studio Code (VS Code). Installez-le puis ajoutez l\'extension officielle "Python" de Microsoft. Vous aurez la coloration syntaxique, l\'autocomplétion, le débogage et un terminal intégré.' },
      { type: 'h2', en: 'Your first program', fr: 'Votre premier programme' },
      { type: 'p', en: 'Create a file called hello.py and write:',
             fr: 'Créez un fichier hello.py et écrivez :' },
      { type: 'code', en: `print("Hello, World!")
print("Welcome to Python.")`, fr: `print("Hello, World !")
print("Bienvenue dans Python.")` },
      { type: 'p', en: 'Run it from the terminal:',
             fr: 'Exécutez-le depuis le terminal :' },
      { type: 'code', en: `python hello.py`, fr: `python hello.py` },
      { type: 'p', en: 'You should see:',
             fr: 'Vous devriez voir :' },
      { type: 'code', en: `Hello, World!
Welcome to Python.`, fr: `Hello, World !
Bienvenue dans Python.` },
      { type: 'tip', en: 'print() is the most useful function when learning. Print values, types, intermediate results — it is your best friend for debugging.',
            fr: 'print() est la fonction la plus utile quand on apprend. Imprimez des valeurs, des types, des résultats intermédiaires — c\'est votre meilleur ami pour le débogage.' },
      { type: 'exercise', en: 'Modify hello.py to print your name, your age, and your favorite hobby on three separate lines.',
            fr: 'Modifiez hello.py pour afficher votre nom, votre âge et votre hobby préféré sur trois lignes séparées.',
            solutionEn: `name = "Alice"
age = 30
hobby = "painting"
print(name)
print(age)
print(hobby)`,
            solutionFr: `name = "Alice"
age = 30
hobby = "peinture"
print(name)
print(age)
print(hobby)` },
    ]
  ),

  // =============== CHAPTER 2 — VARIABLES & TYPES ===============
  c(2, 'variables-types', 1, '📦', 'Variables and Types', 'Variables et types',
    'The atoms of Python: numbers, strings, booleans.',
    'Les briques de base de Python : nombres, chaînes, booléens.',
    [
      { type: 'p', en: 'A variable is a name attached to a value. Python is dynamically typed, so you do not need to declare a type.',
             fr: 'Une variable est un nom attaché à une valeur. Python est à typage dynamique, donc vous n\'avez pas besoin de déclarer le type.' },
      { type: 'code', en: `name = "Alice"      # str
age = 30            # int
height = 1.68       # float
is_student = False  # bool`, fr: `name = "Alice"        # str
age = 30              # int
height = 1.68         # float
is_student = False    # bool` },
      { type: 'h2', en: 'Inspecting types', fr: 'Inspecter les types' },
      { type: 'code', en: `print(type(name))     # <class 'str'>
print(type(age))      # <class 'int'>
print(type(height))   # <class 'float'>
print(type(is_student))  # <class 'bool'>`, fr: `print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
print(type(height))     # <class 'float'>
print(type(is_student)) # <class 'bool'>` },
      { type: 'h2', en: 'Naming rules', fr: 'Règles de nommage' },
      { type: 'ul', en: [
        'Start with a letter or underscore',
        'Only letters, digits, and underscores afterwards',
        'Case-sensitive: Age and age are different',
        'Cannot be a reserved keyword (if, for, def…)',
      ], fr: [
        'Commencer par une lettre ou un soulignement',
        'Ensuite uniquement lettres, chiffres et soulignements',
        'Sensible à la casse : Age et age sont différents',
        'Ne pas être un mot-clé réservé (if, for, def…)',
      ]},
      { type: 'warning', en: 'Avoid names that shadow built-ins like list, dict, id, type. It will bite you later.',
            fr: 'Évitez les noms qui masquent les fonctions intégrées comme list, dict, id, type. Cela vous causera des problèmes plus tard.' },
      { type: 'h2', en: 'Multiple assignment', fr: 'Affectation multiple' },
      { type: 'code', en: `a, b, c = 1, 2, 3
x = y = z = 0
print(a, b, c, x, y, z)  # 1 2 3 0 0 0`, fr: `a, b, c = 1, 2, 3
x = y = z = 0
print(a, b, c, x, y, z)  # 1 2 3 0 0 0` },
      { type: 'exercise', en: 'Create variables for your favorite movie, its release year, and its rating on a 10 scale. Print all three and their types.',
            fr: 'Créez des variables pour votre film préféré, son année de sortie et sa note sur 10. Affichez-les ainsi que leurs types.',
            solutionEn: `title = "Inception"
year = 2010
rating = 8.8
print(title, type(title))
print(year, type(year))
print(rating, type(rating))`,
            solutionFr: `title = "Inception"
year = 2010
rating = 8.8
print(title, type(title))
print(year, type(year))
print(rating, type(rating))` },
    ]
  ),

  // =============== CHAPTER 3 — NUMBERS & STRINGS ===============
  c(3, 'numbers-strings', 1, '🔢', 'Numbers and Strings', 'Nombres et chaînes de caractères',
    'Doing math and working with text.',
    'Faire des calculs et travailler avec du texte.',
    [
      { type: 'h2', en: 'Numeric types', fr: 'Types numériques' },
      { type: 'code', en: `x = 10        # int
y = 3.14      # float
z = 2 + 3j    # complex

print(x + y)
print(x ** 3)     # 1000 (power)
print(x // 3)     # 3 (integer division)
print(x % 3)      # 1 (modulo)
print(abs(-7))    # 7`, fr: `x = 10        # int
y = 3.14      # float
z = 2 + 3j    # complex

print(x + y)
print(x ** 3)     # 1000 (puissance)
print(x // 3)     # 3 (division entière)
print(x % 3)      # 1 (modulo)
print(abs(-7))    # 7` },
      { type: 'h2', en: 'String basics', fr: 'Bases des chaînes' },
      { type: 'code', en: `s = "Python is fun"
print(s.upper())         # PYTHON IS FUN
print(s.lower())         # python is fun
print(s.title())         # Python Is Fun
print(s.replace("fun", "powerful"))
print(len(s))
print("fun" in s)         # True`, fr: `s = "Python est amusant"
print(s.upper())         # PYTHON EST AMUSANT
print(s.lower())         # python est amusant
print(s.title())         # Python Est Amusant
print(s.replace("amusant", "puissant"))
print(len(s))
print("amusant" in s)     # True` },
      { type: 'h2', en: 'f-strings — formatted output', fr: 'f-strings — sortie formatée' },
      { type: 'code', en: `name = "Alice"
score = 94.5
print(f"Hello {name}, your score is {score:.1f}%")
print(f"Next year: {2024 + 1}")
print(f"{'Python':>10}")  # right-align`, fr: `name = "Alice"
score = 94.5
print(f"Bonjour {name}, ton score est {score:.1f}%")
print(f"L'année prochaine : {2024 + 1}")
print(f"{'Python':>10}")  # alignement à droite` },
      { type: 'h2', en: 'Slicing', fr: 'Découpage (slicing)' },
      { type: 'code', en: `word = "Python"
print(word[0])     # P
print(word[-1])    # n
print(word[0:3])   # Pyt
print(word[2:])    # thon
print(word[::-1])  # nohtyP`, fr: `word = "Python"
print(word[0])     # P
print(word[-1])    # n
print(word[0:3])   # Pyt
print(word[2:])    # thon
print(word[::-1])  # nohtyP` },
      { type: 'tip', en: 's[::-1] reverses a string. It is one of the most useful one-liners you will learn.',
            fr: 's[::-1] inverse une chaîne. C\'est l\'un des one-liners les plus utiles que vous apprendrez.' },
      { type: 'exercise', en: 'Given a sentence, print the number of vowels, the sentence reversed, and the sentence in title case.',
            fr: 'À partir d\'une phrase, affichez le nombre de voyelles, la phrase inversée et la phrase en type Title Case.',
            solutionEn: `s = "Python is awesome"
vowels = sum(1 for c in s.lower() if c in "aeiou")
print("vowels:", vowels)
print("reversed:", s[::-1])
print("title:", s.title())`,
            solutionFr: `s = "Python est génial"
voyelles = sum(1 for c in s.lower() if c in "aeiouy")
print("voyelles :", voyelles)
print("inversé :", s[::-1])
print("title :", s.title())` },
    ]
  ),

  // =============== CHAPTER 4 — CONTROL FLOW ===============
  c(4, 'control-flow', 1, '🚦', 'Control Flow: if, for, while', 'Flux de contrôle : if, for, while',
    'Make decisions and repeat work.',
    'Prendre des décisions et répéter des actions.',
    [
      { type: 'h2', en: 'Conditionals', fr: 'Conditionnelles' },
      { type: 'code', en: `age = int(input("How old are you? "))
if age < 0:
    print("Invalid age")
elif age < 18:
    print("You are a minor")
elif age < 65:
    print("You are an adult")
else:
    print("Senior")`, fr: `age = int(input("Quel âge avez-vous ? "))
if age < 0:
    print("Âge invalide")
elif age < 18:
    print("Vous êtes mineur")
elif age < 65:
    print("Vous êtes adulte")
else:
    print("Senior")` },
      { type: 'h2', en: 'Truthiness', fr: 'Valeurs de vérité' },
      { type: 'p', en: 'Empty collections, 0, None, and False are falsy. Everything else is truthy.',
             fr: 'Les collections vides, 0, None et False sont faux. Tout le reste est vrai.' },
      { type: 'code', en: `items = [1, 2, 3]
if items:
    print("we have items")`, fr: `items = [1, 2, 3]
if items:
    print("nous avons des éléments")` },
      { type: 'h2', en: 'for loops', fr: 'Boucles for' },
      { type: 'code', en: `fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range
for i in range(5):       # 0..4
    print(i)
for i in range(2, 10, 2):  # 2,4,6,8
    print(i)`, fr: `fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)

# range
for i in range(5):       # 0..4
    print(i)
for i in range(2, 10, 2):  # 2,4,6,8
    print(i)` },
      { type: 'h2', en: 'while loops and break/continue', fr: 'Boucles while et break/continue' },
      { type: 'code', en: `n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue     # skip even
    print(n)
    if n == 7:
        break        # exit loop`, fr: `n = 0
while n < 10:
    n += 1
    if n % 2 == 0:
        continue     # saute les pairs
    print(n)
    if n == 7:
        break        # sort de la boucle` },
      { type: 'h2', en: 'Comprehensions', fr: 'Compréhensions' },
      { type: 'code', en: `squares = [n * n for n in range(10)]
evens = [n for n in range(20) if n % 2 == 0]
matrix = [[i * j for j in range(3)] for i in range(3)]
print(squares)
print(evens)
print(matrix)`, fr: `squares = [n * n for n in range(10)]
pairs = [n for n in range(20) if n % 2 == 0]
matrice = [[i * j for j in range(3)] for i in range(3)]
print(squares)
print(pairs)
print(matrice)` },
      { type: 'warning', en: 'Avoid deeply nested comprehensions. They hurt readability. If it does not fit on one line, write a loop.',
            fr: 'Évitez les compréhensions imbriquées trop profondément. Elles nuisent à la lisibilité. Si ça ne tient pas sur une ligne, écrivez une boucle.' },
      { type: 'exercise', en: 'Print the first 30 Fibonacci numbers using a loop, then do the same using a comprehension.',
            fr: 'Affichez les 30 premiers nombres de Fibonacci avec une boucle, puis avec une compréhension.',
            solutionEn: `# loop
a, b = 0, 1
for _ in range(30):
    print(a, end=" ")
    a, b = b, a + b
print()
# comprehension
fibs = []
a, b = 0, 1
for _ in range(30):
    fibs.append(a)
    a, b = b, a + b
# pure comprehension:
fibs2 = [0, 1] + [(fibs2 := [0, 1]) or [b for _ in [0]]]
print(fibs)`,
            solutionFr: `# boucle
a, b = 0, 1
for _ in range(30):
    print(a, end=" ")
    a, b = b, a + b
print()
# construction d'une liste
fibs = []
a, b = 0, 1
for _ in range(30):
    fibs.append(a)
    a, b = b, a + b
print(fibs)` },
    ]
  ),

  // =============== CHAPTER 5 — FUNCTIONS ===============
  c(5, 'functions', 1, '🧩', 'Functions and Scope', 'Fonctions et portée',
    'Reusable blocks of code.',
    'Des blocs de code réutilisables.',
    [
      { type: 'h2', en: 'Defining a function', fr: 'Définir une fonction' },
      { type: 'code', en: `def greet(name):
    """Return a friendly greeting."""
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet("Bob"))`, fr: `def saluer(nom):
    """Retourne une salutation amicale."""
    return f"Bonjour, {nom} !"

print(saluer("Alice"))
print(saluer("Bob"))` },
      { type: 'h2', en: 'Default and keyword arguments', fr: 'Arguments par défaut et mots-clés' },
      { type: 'code', en: `def power(base, exp=2):
    return base ** exp

print(power(3))         # 9
print(power(3, 3))      # 27
print(power(exp=3, base=2))  # 8`, fr: `def puissance(base, exp=2):
    return base ** exp

print(puissance(3))         # 9
print(puissance(3, 3))      # 27
print(puissance(exp=3, base=2))  # 8` },
      { type: 'h2', en: '*args and **kwargs', fr: '*args et **kwargs' },
      { type: 'code', en: `def log(*messages, level="info"):
    for m in messages:
        print(f"[{level.upper()}] {m}")

log("hello", "world")
log("oops", level="error")`, fr: `def journal(*messages, niveau="info"):
    for m in messages:
        print(f"[{niveau.upper()}] {m}")

journal("bonjour", "monde")
journal("oups", niveau="erreur")` },
      { type: 'h2', en: 'Scope: LEGB rule', fr: 'Portée : règle LEGB' },
      { type: 'code', en: `x = "global"
def outer():
    x = "enclosing"
    def inner():
        x = "local"
        print(x)
    inner()
    print(x)

outer()        # local / enclosing
print(x)       # global`, fr: `x = "global"
def externe():
    x = "englobant"
    def interne():
        x = "local"
        print(x)
    interne()
    print(x)

externe()      # local / englobant
print(x)       # global` },
      { type: 'h2', en: 'Docstrings and type hints', fr: 'Docstrings et annotations de type' },
      { type: 'code', en: `from typing import Iterable

def mean(values: Iterable[float]) -> float:
    """Return the arithmetic mean of a series of numbers."""
    total = 0.0
    count = 0
    for v in values:
        total += v
        count += 1
    if count == 0:
        raise ValueError("mean() requires at least one value")
    return total / count`, fr: `from typing import Iterable

def moyenne(valeurs: Iterable[float]) -> float:
    """Retourne la moyenne arithmétique d'une série de nombres."""
    total = 0.0
    count = 0
    for v in valeurs:
        total += v
        count += 1
    if count == 0:
        raise ValueError("moyenne() nécessite au moins une valeur")
    return total / count` },
      { type: 'tip', en: 'Type hints are optional at runtime but make your code self-documenting and editable by tooling like mypy and pyright.',
            fr: 'Les annotations de type sont optionnelles à l\'exécution mais rendent le code auto-documenté et exploitable par mypy et pyright.' },
      { type: 'exercise', en: 'Write a function that takes any number of numeric arguments and returns their geometric mean.',
            fr: 'Écrivez une fonction qui prend un nombre quelconque d\'arguments numériques et retourne leur moyenne géométrique.',
            solutionEn: `from math import prod

def gmean(*nums):
    if not nums:
        raise ValueError("gmean needs at least one value")
    p = prod(nums)
    return p ** (1 / len(nums))`,
            solutionFr: `from math import prod

def mg(*nums):
    if not nums:
        raise ValueError("mg nécessite au moins une valeur")
    p = prod(nums)
    return p ** (1 / len(nums))` },
    ]
  ),
];

export default chapters;
