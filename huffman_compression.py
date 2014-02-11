codes = {}

def frequency(str):
    freqs = {}
    for ch in str:
        freqs[ch] = freqs.get(ch,0) + 1
    return freqs

freqs = frequency("javascript")
print freqs

def sortFreq(freqs):
    letters = freqs.keys()
    tuples = []
    for let in letters:
        tuples.append((freqs[let],let))
    tuples.sort()
    return tuples

sort = sortFreq(freqs)
print sort

def buildTree(tuples):
    while len(tuples) > 1:
        leastTwo = tuple(tuples[0:2])
        theRest = tuples[2:]
        combFreq = leastTwo[0][0] + leastTwo[1][0]
        tuples = theRest + [(combFreq,leastTwo)]
        tuples.sort()
    return tuples[0]

build = buildTree(sort)
print build

def trimTree(tree):
    p = tree[1]
    if type(p) == type(""): return p
    else: return (trimTree(p[0]), trimTree(p[1]))

trim = trimTree(build)
print trim

def assignCodes(node, pat=""):
    global codes
    if type(node) == type(""):
        codes[node] = pat
    else:
        assignCodes(node[0], pat+"0")
        assignCodes(node[1], pat+"1")

assignCodes(trim)
print codes

def encode(str):
    global codes
    output = ""
    for ch in str:
        output += codes[ch]
    return output

encoding = encode("javascript")
print encoding

def decode(tree,str):
    output = ""
    p = tree
    for bit in str:
        if bit == '0': p = p[0]
        else         : p = p[1]
        if type(p) == type(""):
            output += p
            p = tree
    return output

decoding = decode(trim, encoding)
print decoding

