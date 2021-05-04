pyperclip = __import__("pyperclip")
if __name__ == "__main__":
    file = open("Data.txt", "r")
    names = file.readlines()
    parsedNames = ""
    for x in names:
        x = x.split(" ")
        parsedNames = parsedNames + x[2] + " " + x[1] + " "
    print(parsedNames[:-2])
    pyperclip.copy(parsedNames[:-2])
