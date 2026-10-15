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

export const chaptersPart3: Chapter[] = [
  c(13, 'iterators', 3, '🔄', 'Iterators and Generators', 'Itérateurs et générateurs',
    'Streams of data on demand.',
    'Des flux de données à la demande.',
    [
      { type: 'p', en: 'An iterator is anything you can pass to next() to get the next value. A generator is a compact way to write iterators using yield.',
             fr: 'Un itérateur est tout ce que l\'on peut passer à next() pour obtenir la valeur suivante. Un générateur est une façon compacte d\'écrire des itérateurs en utilisant yield.' },
      { type: 'code', en: 'def counter(n):\n    for i in range(n):\n        yield i\n\nfor value in counter(5):\n    print(value)', fr: 'def compteur(n):\n    for i in range(n):\n        yield i\n\nfor valeur in compteur(5):\n    print(valeur)' },
      { type: 'code', en: 'g = counter(10)\nprint(next(g), next(g), next(g))\n# A generator is single-use.\nprint(list(counter(5)))', fr: 'g = compteur(10)\nprint(next(g), next(g), next(g))\n# Un générateur est à usage unique.\nprint(list(compteur(5)))' },
      { type: 'h2', en: 'Generator expressions', fr: 'Expressions génératrices' },
      { type: 'code', en: '# like a list comprehension, but lazy\ntotal = sum(x * x for x in range(1_000_000))\nprint(total)', fr: '# comme une compréhension de liste, mais paresseuse\ntotal = sum(x * x for x in range(1_000_000))\nprint(total)' },
      { type: 'h2', en: 'itertools', fr: 'itertools' },
      { type: 'code', en: 'from itertools import count, islice, chain, groupby\n\n# Count to 100 starting at 10\nevens_under_100 = list(islice((x for x in count(10) if x % 2 == 0), 5))\nprint(evens_under_100)\n\n# Flatten\nflat = list(chain([1, 2], [3, 4], [5]))\nprint(flat)', fr: 'from itertools import count, islice, chain, groupby\n\n# Compter à partir de 10\npairs_sous_100 = list(islice((x for x in count(10) if x % 2 == 0), 5))\nprint(pairs_sous_100)\n\n# Aplatir\nplat = list(chain([1, 2], [3, 4], [5]))\nprint(plat)' },
      { type: 'tip', en: 'When data does not fit in memory, prefer generators over lists — they compute values on demand.',
            fr: 'Quand les données ne tiennent pas en mémoire, privilégiez les générateurs aux listes — ils calculent les valeurs à la demande.' },
      { type: 'exercise', en: 'Write a generator fib() that produces the Fibonacci sequence forever; slice it to get the first 20 values.',
            fr: 'Écrivez un générateur fib() qui produit la suite de Fibonacci indéfiniment ; slicez-le pour obtenir les 20 premières valeurs.',
            solutionEn: 'from itertools import islice\n\ndef fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nprint(list(islice(fib(), 20)))',
            solutionFr: 'from itertools import islice\n\ndef fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nprint(list(islice(fib(), 20)))' },
    ]
  ),

  c(14, 'decorators', 3, '🎀', 'Decorators and Closures', 'Décorateurs et fermetures',
    'Wrap functions to add behavior.',
    'Envelopper des fonctions pour ajouter du comportement.',
    [
      { type: 'code', en: 'def trace(fn):\n    def wrapper(*args, **kwargs):\n        print(f"calling {fn.__name__}{args} {kwargs}")\n        result = fn(*args, **kwargs)\n        print(f"-> {result}")\n        return result\n    return wrapper\n\n@trace\ndef add(a, b):\n    return a + b\n\nadd(2, 3)', fr: 'def tracer(fn):\n    def wrapper(*args, **kwargs):\n        print(f"appel {fn.__name__}{args} {kwargs}")\n        resultat = fn(*args, **kwargs)\n        print(f"-> {resultat}")\n        return resultat\n    return wrapper\n\n@tracer\ndef additionner(a, b):\n    return a + b\n\nadditionner(2, 3)' },
      { type: 'h2', en: 'Preserving metadata with functools.wraps', fr: 'Conserver les métadonnées avec functools.wraps' },
      { type: 'code', en: 'from functools import wraps\n\ndef trace(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        print(f"calling {fn.__name__}")\n        return fn(*args, **kwargs)\n    return wrapper', fr: 'from functools import wraps\n\ndef tracer(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        print(f"appel {fn.__name__}")\n        return fn(*args, **kwargs)\n    return wrapper' },
      { type: 'h2', en: 'Closures', fr: 'Fermetures' },
      { type: 'code', en: 'def make_multiplier(factor):\n    def multiply(n):\n        return n * factor\n    return multiply\n\ntimes3 = make_multiplier(3)\nprint(times3(10))', fr: 'def fabrique_multiplicateur(facteur):\n    def multiplier(n):\n        return n * facteur\n    return multiplier\n\nfois3 = fabrique_multiplicateur(3)\nprint(fois3(10))' },
      { type: 'h2', en: 'Decorators with arguments', fr: 'Décorateurs paramétrés' },
      { type: 'code', en: 'from functools import wraps\n\ndef repeat(times):\n    def decorator(fn):\n        @wraps(fn)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = fn(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Alice")', fr: 'from functools import wraps\n\ndef repeter(fois):\n    def decorateur(fn):\n        @wraps(fn)\n        def wrapper(*args, **kwargs):\n            for _ in range(fois):\n                resultat = fn(*args, **kwargs)\n            return resultat\n        return wrapper\n    return decorateur\n\n@repeter(3)\ndef saluer(nom):\n    print(f"Bonjour, {nom} !")\n\nsaluer("Alice")' },
      { type: 'exercise', en: 'Write a decorator @timer that measures and prints how long the wrapped function takes to execute (in ms).',
            fr: 'Écrivez un décorateur @timer qui mesure et affiche la durée d\'exécution de la fonction enveloppée (en ms).',
            solutionEn: 'import time\nfrom functools import wraps\n\ndef timer(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        result = fn(*args, **kwargs)\n        ms = (time.perf_counter() - t0) * 1000\n        print(f"{fn.__name__} took {ms:.2f} ms")\n        return result\n    return wrapper',
            solutionFr: 'import time\nfrom functools import wraps\n\ndef timer(fn):\n    @wraps(fn)\n    def wrapper(*args, **kwargs):\n        t0 = time.perf_counter()\n        resultat = fn(*args, **kwargs)\n        ms = (time.perf_counter() - t0) * 1000\n        print(f"{fn.__name__} a pris {ms:.2f} ms")\n        return resultat\n    return wrapper' },
    ]
  ),

  c(15, 'context-managers', 3, '🚪', 'Context Managers', 'Gestionnaires de contexte',
    'The with statement and the protocol behind it.',
    'L\'instruction with et le protocole sous-jacent.',
    [
      { type: 'code', en: 'with open("data.txt", encoding="utf-8") as f:\n    contents = f.read()\n# f.__exit__ has been called, file closed', fr: 'with open("data.txt", encoding="utf-8") as f:\n    contenu = f.read()\n# f.__exit__ a été appelé, fichier fermé' },
      { type: 'h2', en: 'Writing your own', fr: 'Écrire les vôtres' },
      { type: 'code', en: 'class Timer:\n    def __enter__(self):\n        import time\n        self._t0 = time.perf_counter()\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        import time\n        self.elapsed = time.perf_counter() - self._t0\n        print(f"elapsed: {self.elapsed:.3f}s")\n        return False\n\nwith Timer() as t:\n    s = sum(range(1_000_000))\nprint(s)', fr: 'class Chrono:\n    def __enter__(self):\n        import time\n        self._t0 = time.perf_counter()\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        import time\n        self.ecoule = time.perf_counter() - self._t0\n        print(f"écoulé : {self.ecoule:.3f}s")\n        return False\n\nwith Chrono() as c:\n    s = sum(range(1_000_000))\nprint(s)' },
      { type: 'h2', en: 'contextlib.contextmanager', fr: 'contextlib.contextmanager' },
      { type: 'code', en: 'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer():\n    t0 = time.perf_counter()\n    yield\n    print(f"elapsed: {time.perf_counter() - t0:.3f}s")\n\nwith timer():\n    sum(range(1_000_000))', fr: 'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef chrono():\n    t0 = time.perf_counter()\n    yield\n    print(f"écoulé : {time.perf_counter() - t0:.3f}s")\n\nwith chrono():\n    sum(range(1_000_000))' },
      { type: 'tip', en: 'Whenever you have a setup/teardown pattern (open/close, lock/release, start/stop), reach for a context manager.',
            fr: 'À chaque fois que vous avez un pattern setup/teardown (open/close, lock/release, start/stop), utilisez un gestionnaire de contexte.' },
      { type: 'exercise', en: 'Write a context manager that temporarily changes the working directory and changes it back on exit.',
            fr: 'Écrivez un gestionnaire de contexte qui change temporairement le répertoire de travail et le restaure à la sortie.',
            solutionEn: 'from contextlib import contextmanager\nimport os\n\n@contextmanager\ndef changedir(path):\n    old = os.getcwd()\n    os.chdir(path)\n    try:\n        yield\n    finally:\n        os.chdir(old)',
            solutionFr: 'from contextlib import contextmanager\nimport os\n\n@contextmanager\ndef changer_rep(path):\n    ancien = os.getcwd()\n    os.chdir(path)\n    try:\n        yield\n    finally:\n        os.chdir(ancien)' },
    ]
  ),

  c(16, 'dataclasses', 3, '🗃️', 'Dataclasses and Enums', 'Dataclasses et énumérations',
    'Structured data without boilerplate.',
    'Données structurées sans code répétitif.',
    [
      { type: 'code', en: 'from dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n    tags: List[str] = field(default_factory=list)\n\np = Point(1.5, 2.5)\np.tags.append("origin")\nprint(p)', fr: 'from dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n    tags: List[str] = field(default_factory=list)\n\np = Point(1.5, 2.5)\np.tags.append("origine")\nprint(p)' },
      { type: 'h2', en: 'Enums for fixed choices', fr: 'Énumérations pour des choix fixes' },
      { type: 'code', en: 'from enum import Enum, auto\n\nclass Status(Enum):\n    PENDING = auto()\n    RUNNING = auto()\n    DONE = auto()\n    FAILED = auto()\n\nprint(Status.RUNNING)         # Status.RUNNING\nprint(Status.RUNNING.value)   # 2', fr: 'from enum import Enum, auto\n\nclass Statut(Enum):\n    EN_ATTENTE = auto()\n    EN_COURS = auto()\n    TERMINE = auto()\n    ECHEC = auto()\n\nprint(Statut.EN_COURS)\nprint(Statut.EN_COURS.value)' },
      { type: 'h2', en: 'Frozen and eq', fr: 'Frozen et eq' },
      { type: 'code', en: '@dataclass(frozen=True, order=True)\nclass Version:\n    major: int\n    minor: int\n\nprint(Version(2, 1) < Version(2, 2))\nv = Version(1, 0)\n# v.major = 2   # FrozenInstanceError', fr: '@dataclass(frozen=True, order=True)\nclass Version:\n    major: int\n    minor: int\n\nprint(Version(2, 1) < Version(2, 2))\nv = Version(1, 0)\n# v.major = 2   # FrozenInstanceError' },
      { type: 'exercise', en: 'Model a playing card as a frozen dataclass containing a Rank enum (Ace, 2..10, J, Q, K) and a Suit enum (clubs, diamonds, hearts, spades).',
            fr: 'Modélisez une carte à jouer comme une dataclass gelée contenant une enum Rang (As, 2..10, V, D, R) et une enum Couleur (pique, carreau, coeur, trèfle).',
            solutionEn: 'from dataclasses import dataclass\nfrom enum import IntEnum\n\nclass Rank(IntEnum):\n    ACE = 1\n    TWO = 2\n    THREE = 3\n    # ...\n\nclass Suit(IntEnum):\n    CLUBS = 1\n    DIAMONDS = 2\n    HEARTS = 3\n    SPADES = 4\n\n@dataclass(frozen=True, order=True)\nclass Card:\n    rank: Rank\n    suit: Suit',
            solutionFr: 'from dataclasses import dataclass\nfrom enum import IntEnum\n\nclass Rang(IntEnum):\n    AS = 1\n    DEUX = 2\n    TROIS = 3\n\nclass Couleur(IntEnum):\n    PIQUE = 1\n    CARREAU = 2\n    COEUR = 3\n    TREFLE = 4\n\n@dataclass(frozen=True, order=True)\nclass Carte:\n    rang: Rang\n    couleur: Couleur' },
    ]
  ),

  c(17, 'comprehensions-deep', 3, '🔁', 'Functional & Comprehensions', 'Programmation fonctionnelle',
    'map, filter, reduce, sorted, lambdas and the power of comprehensions.',
    'map, filter, reduce, sorted, lambdas et la puissance des compréhensions.',
    [
      { type: 'code', en: 'nums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x * 2, nums))\nevens = list(filter(lambda x: x % 2 == 0, nums))\nfrom functools import reduce\nproduct = reduce(lambda a, b: a * b, nums)\nprint(doubled, evens, product)', fr: 'nums = [1, 2, 3, 4, 5]\ndouble = list(map(lambda x: x * 2, nums))\npairs = list(filter(lambda x: x % 2 == 0, nums))\nfrom functools import reduce\nproduit = reduce(lambda a, b: a * b, nums)\nprint(double, pairs, produit)' },
      { type: 'warning', en: 'Lambdas are limited to expressions — no statements, no assignment. For anything longer, write a def.',
            fr: 'Les lambdas sont limitées à des expressions — pas de statements ni d\'assignation. Pour tout ce qui est plus long, utilisez def.' },
      { type: 'h2', en: 'Sorting', fr: 'Tri' },
      { type: 'code', en: 'users = [\n    {"name": "Alice", "age": 30},\n    {"name": "Bob", "age": 25},\n    {"name": "Carol", "age": 40},\n]\nby_age = sorted(users, key=lambda u: u["age"])\nprint([u["name"] for u in by_age])', fr: 'utilisateurs = [\n    {"nom": "Alice", "age": 30},\n    {"nom": "Bob", "age": 25},\n    {"nom": "Carol", "age": 40},\n]\npar_age = sorted(utilisateurs, key=lambda u: u["age"])\nprint([u["nom"] for u in par_age])' },
      { type: 'h2', en: 'Conditional expressions and walrus', fr: 'Expressions conditionnelles et walrus' },
      { type: 'code', en: '# Conditional expression (Python ternary)\nstatus = "adult" if 30 >= 18 else "minor"\n\n# Walrus operator := assigns and returns in one step\nwhile (line := input("> ")) != "quit":\n    print("got:", line.upper())', fr: '# Expression conditionnelle (ternaire Python)\nstatut = "adulte" if 30 >= 18 else "mineur"\n\n# Opérateur morse := assigne et retourne en une étape\nwhile (ligne := input("> ")) != "quit":\n    print("reçu :", ligne.upper())' },
      { type: 'exercise', en: 'Given a list of words, produce a list of (word, length) tuples sorted by descending length, tie-break by alphabetical order.',
            fr: 'Étant donné une liste de mots, produisez une liste de tuples (mot, longueur) triée par longueur décroissante, puis par ordre alphabétique.',
            solutionEn: 'words = ["python", "is", "fun", "and", "powerful"]\nresult = sorted(((w, len(w)) for w in words), key=lambda t: (-t[1], t[0]))\nprint(result)',
            solutionFr: 'mots = ["python", "est", "amusant", "et", "puissant"]\nresultat = sorted(((m, len(m)) for m in mots), key=lambda t: (-t[1], t[0]))\nprint(resultat)' },
    ]
  ),

  c(18, 'concurrency', 3, '⚡', 'Concurrency: Threads, Async', 'Concurrence : threads, async',
    'Doing many things at once.',
    'Faire plusieurs choses à la fois.',
    [
      { type: 'h2', en: 'Threading vs multiprocessing vs asyncio', fr: 'Threading vs multiprocessing vs asyncio' },
      { type: 'ul', en: [
        'Threading: I/O-bound, GIL limits CPU parallelism',
        'Multiprocessing: CPU-bound, true parallelism via separate interpreters',
        'Asyncio: cooperative concurrency, single-thread, great for many sockets',
      ], fr: [
        'Threading : lié à l\'I/O, le GIL limite le parallélisme CPU',
        'Multiprocessing : lié au CPU, vrai parallélisme via des interpréteurs distincts',
        'Asyncio : concurrence coopérative, mono-thread, idéal pour de nombreuses sockets',
      ]},
      { type: 'h2', en: 'ThreadPoolExecutor', fr: 'ThreadPoolExecutor' },
      { type: 'code', en: 'from concurrent.futures import ThreadPoolExecutor\nimport urllib.request\n\nurls = [\n    "https://example.com",\n    "https://python.org",\n]\n\ndef fetch(url):\n    with urllib.request.urlopen(url, timeout=5) as r:\n        return url, len(r.read())\n\nwith ThreadPoolExecutor(max_workers=8) as ex:\n    for url, size in ex.map(fetch, urls):\n        print(url, size)', fr: 'from concurrent.futures import ThreadPoolExecutor\nimport urllib.request\n\nurls = [\n    "https://example.com",\n    "https://python.org",\n]\n\ndef telecharger(url):\n    with urllib.request.urlopen(url, timeout=5) as r:\n        return url, len(r.read())\n\nwith ThreadPoolExecutor(max_workers=8) as ex:\n    for url, taille in ex.map(telecharger, urls):\n        print(url, taille)' },
      { type: 'h2', en: 'Async with coroutines', fr: 'Async avec des coroutines' },
      { type: 'code', en: 'import asyncio\n\nasync def main():\n    await asyncio.sleep(1)\n    print("done after 1s")\n\nasyncio.run(main())', fr: 'import asyncio\n\nasync def main():\n    await asyncio.sleep(1)\n    print("fait après 1s")\n\nasyncio.run(main())' },
      { type: 'code', en: 'import asyncio\n\nasync def fetch_all(urls):\n    async def fetch(u):\n        await asyncio.sleep(1)        # pretend network call\n        return u, len(u)\n    results = await asyncio.gather(*(fetch(u) for u in urls))\n    return results\n\nprint(asyncio.run(fetch_all(["a", "bb", "ccc"])))', fr: 'import asyncio\n\nasync def telecharger_tout(urls):\n    async def telecharger(u):\n        await asyncio.sleep(1)\n        return u, len(u)\n    resultats = await asyncio.gather(*(telecharger(u) for u in urls))\n    return resultats\n\nprint(asyncio.run(telecharger_tout(["a", "bb", "ccc"])))' },
      { type: 'warning', en: 'Do not mix blocking I/O with asyncio. Wrap blocking calls with asyncio.to_thread or run them in a ProcessPoolExecutor.',
            fr: 'Ne mélangez pas d\'I/O bloquant avec asyncio. Encapsulez les appels bloquants avec asyncio.to_thread ou exécutez-les dans un ProcessPoolExecutor.' },
      { type: 'exercise', en: 'Write a small async program that runs three sleep(1) calls in parallel and reports the total elapsed time.',
            fr: 'Écrivez un petit programme async qui exécute trois appels sleep(1) en parallèle et affiche le temps total écoulé.',
            solutionEn: 'import asyncio\nimport time\n\nasync def task(i):\n    await asyncio.sleep(1)\n    return i\n\nasync def main():\n    t0 = time.perf_counter()\n    results = await asyncio.gather(*(task(i) for i in range(3)))\n    print("results:", results)\n    print("elapsed:", time.perf_counter() - t0)\n\nasyncio.run(main())',
            solutionFr: 'import asyncio\nimport time\n\nasync def tache(i):\n    await asyncio.sleep(1)\n    return i\n\nasync def main():\n    t0 = time.perf_counter()\n    resultats = await asyncio.gather(*(tache(i) for i in range(3)))\n    print("resultats :", resultats)\n    print("ecoule :", time.perf_counter() - t0)\n\nasyncio.run(main())' },
    ]
  ),

  c(19, 'typing-deep', 3, '🧬', 'Advanced Typing', 'Typage avancé',
    'Generics, Protocols, TypeVar and the typing module.',
    'Generics, Protocols, TypeVar et le module typing.',
    [
      { type: 'code', en: 'from typing import TypeVar, Iterable, Protocol\n\nT = TypeVar("T")\nU = TypeVar("U")\n\ndef first(seq: Iterable[T]) -> T | None:\n    for item in seq:\n        return item\n    return None', fr: 'from typing import TypeVar, Iterable, Protocol\n\nT = TypeVar("T")\nU = TypeVar("U")\n\ndef premier(seq: Iterable[T]) -> T | None:\n    for item in seq:\n        return item\n    return None' },
      { type: 'h2', en: 'Protocols: structural typing (duck typing made explicit)', fr: 'Protocols : typage structurel' },
      { type: 'code', en: 'from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\ndef render(d: Drawable) -> None:\n    d.draw()\n\n# Any class with a draw() method satisfies Drawable.', fr: 'from typing import Protocol\n\nclass Dessinable(Protocol):\n    def draw(self) -> None: ...\n\ndef afficher(d: Dessinable) -> None:\n    d.draw()\n\n# Toute classe avec une méthode draw() satisfait Dessinable.' },
      { type: 'h2', en: 'Type aliases', fr: 'Alias de types' },
      { type: 'code', en: 'from typing import NewType\n\nUserId = NewType("UserId", int)\n\ndef get_user(uid: UserId) -> dict:\n    return {"id": int(uid), "name": "Alice"}\n\nprint(get_user(UserId(7)))', fr: 'from typing import NewType\n\nIdUtilisateur = NewType("IdUtilisateur", int)\n\ndef obtenir_utilisateur(uid: IdUtilisateur) -> dict:\n    return {"id": int(uid), "nom": "Alice"}\n\nprint(obtenir_utilisateur(IdUtilisateur(7)))' },
      { type: 'tip', en: 'Use mypy or pyright in your CI pipeline to keep type errors from reaching production.',
            fr: 'Utilisez mypy ou pyright dans votre pipeline CI pour que les erreurs de typage ne finissent pas en production.' },
      { type: 'exercise', en: 'Write a generic stack[T] class supporting push, pop, peek, and is_empty operations.',
            fr: 'Écrivez une classe générique pile[T] supportant push, pop, peek et est_vide.',
            solutionEn: 'from typing import Generic, TypeVar\nT = TypeVar("T")\n\nclass Stack(Generic[T]):\n    def __init__(self):\n        self._items: list[T] = []\n    def push(self, item: T) -> None:\n        self._items.append(item)\n    def pop(self) -> T:\n        return self._items.pop()\n    def peek(self) -> T:\n        return self._items[-1]\n    def is_empty(self) -> bool:\n        return not self._items',
            solutionFr: 'from typing import Generic, TypeVar\nT = TypeVar("T")\n\nclass Pile(Generic[T]):\n    def __init__(self):\n        self._items: list[T] = []\n    def push(self, item: T) -> None:\n        self._items.append(item)\n    def pop(self) -> T:\n        return self._items.pop()\n    def peek(self) -> T:\n        return self._items[-1]\n    def est_vide(self) -> bool:\n        return not self._items' },
    ]
  ),

  c(20, 'metaclasses', 3, '🪞', 'Metaclasses and Descriptors', 'Métaclasses et descripteurs',
    'How Python lets you customize the language itself.',
    'Comment Python permet de personnaliser le langage lui-même.',
    [
      { type: 'p', en: 'A class is an object. Its type is metaclass (default: type). A descriptor is an object that customizes attribute access on a class.',
             fr: 'Une classe est un objet. Son type est la métaclasse (par défaut : type). Un descripteur est un objet qui personnalise l\'accès aux attributs d\'une classe.' },
      { type: 'code', en: 'class RevealAccess:\n    def __set_name__(self, owner, name):\n        self.name = name\n    def __get__(self, obj, objtype=None):\n        print(f"get {self.name}")\n        return self.value\n    def __set__(self, obj, value):\n        print(f"set {self.name} = {value}")\n        self.value = value\n\nclass Box:\n    width = RevealAccess()\n\nb = Box()\nb.width = 10\nprint(b.width)', fr: 'class AccesPublic:\n    def __set_name__(self, proprietaire, nom):\n        self.nom = nom\n    def __get__(self, obj, objtype=None):\n        print(f"get {self.nom}")\n        return self.valeur\n    def __set__(self, obj, valeur):\n        print(f"set {self.nom} = {valeur}")\n        self.valeur = valeur\n\nclass Boite:\n    largeur = AccesPublic()\n\nb = Boite()\nb.largeur = 10\nprint(b.largeur)' },
      { type: 'h2', en: 'A simple metaclass', fr: 'Une métaclasse simple' },
      { type: 'code', en: 'class UpperMeta(type):\n    def __new__(mcs, name, bases, namespace):\n        # Convert public method names to upper-case display in repr.\n        namespace["__repr__"] = lambda self: f"<{name.upper()} instance>"\n        return super().__new__(mcs, name, bases, namespace)\n\nclass Thing(metaclass=UpperMeta):\n    pass\n\nprint(Thing())  # <THING instance>', fr: 'class MetaMajuscule(type):\n    def __new__(mcs, nom, bases, namespace):\n        # Convertit l\'affichage en majuscules.\n        namespace["__repr__"] = lambda self: f"<instance {nom.upper()}>"\n        return super().__new__(mcs, nom, bases, namespace)\n\nclass Truc(metaclass=MetaMajuscule):\n    pass\n\nprint(Truc())' },
      { type: 'warning', en: 'Metaclasses and descriptors are powerful but rarely necessary. Prefer dataclasses, properties, and plain classes first.',
            fr: 'Les métaclasses et descripteurs sont puissants mais rarement nécessaires. Préférez les dataclasses, les properties et les classes classiques d\'abord.' },
      { type: 'tip', en: 'Most production code never needs a metaclass. SQLAlchemy, Django ORM and abc use them — but the average app does not.',
            fr: 'La plupart du code de production n\'a jamais besoin d\'une métaclasse. SQLAlchemy, l\'ORM Django et abc les utilisent — mais une application moyenne, non.' },
    ]
  ),
];
