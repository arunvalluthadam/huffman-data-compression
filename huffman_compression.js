var codes = {}

function frequency(str)
{
    var freqs = {};
    for (var count = 0; count < str.length; count++)
    {
        if (str[count] in freqs)
            freqs[str[count]] += 1;
        else
            freqs[str[count]] = 1;
    }
    return freqs;
}

var freqs = frequency("javascript");
console.log(freqs);

function sortFreq(freqs)
{
    var tuples = []
    for (var letter in freqs)
        tuples.push([freqs[letter],letter]);
    return tuples.sort();
}

var tuples = sortFreq(freqs)
console.log(tuples);

function buildTree(tuples)
{
    while (tuples.length > 1)
    {
        var leastTwo = [tuples[0][1], tuples[1][1]];
        var theRest = tuples.slice(2);
        var combFreq = tuples[0][0] + tuples[1][0];
        var tuples = theRest;
        var end = [combFreq, leastTwo];
        tuples.push(end);
        tuples.sort();
    }
    return tuples[0][1];
}

var tree = buildTree(tuples);
console.log(tree);

var pat = "";
function assignCodes(node, pat)
{
    if (typeof(node) == typeof(""))
        codes[node] = pat;
    else
    {
        assignCodes(node[0], pat+"0");
        assignCodes(node[1], pat+"1");
    }
}

assignCodes(tree, pat);
console.log(codes);

function encode(str)
{
    var output = "";
    for (var ch in str)
        output += codes[str[ch]];
    return output;
}

var encoding = encode("javascript");
console.log(encoding);

function decode(tree,enStr)
{
    var output = "";
    var p = tree;
    for (var bit in enStr)
    {
        if (enStr[bit] == "0")
            p = p[0];
        else
            p = p[1];
        if (typeof(p) == typeof(""))
        {
            output += p;
            p = tree;
        }
    }
    return output;
}

var decoding = decode(tree, encoding);
console.log(decoding);
