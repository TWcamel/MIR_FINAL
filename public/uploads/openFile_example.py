def runTest(rng):
    tmp = [i for i in range(rng)]
    print(tmp)
    return tmp


def open_file(fileName, funName):
    f = open(fileName, mode='w')
    var = str(eval(funName))
    f.write(var)
    f.close()

if __name__ == '__main__':
    open_file("./data.txt", 'runTest(10)')