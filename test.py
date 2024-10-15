class Chunk:
    def __init__(
        self,
        name: str = "",
        description: str = "",
        cords: dict = {"x": 0, "y": 0, "z": 0},
    ) -> None:
        self.name = name
        self.cords = cords
        self.description = description

    def getChunk(self):
        return [self.name]

    def __str__(self):
        return f"Chunk name:{self.name}, Chunk description:{self.description}"


class Player:
    def __init__(
        self,
        uuid: str,
        nick_name: str,
        current_location: dict = {"x": 0, "y": 0, "z": 0},
    ) -> None:
        self.uuid = uuid
        self.nick_name = nick_name
        self.current_location = current_location

    def __str__(self):
        return f"Player nickname:{self.nick_name}"


class Map:
    def __init__(self, chunks: list = []) -> None:
        self.chunks = chunks

    def run(self):
        map: str = ""
        for i, chunk in enumerate(self.chunks):
            map += str(chunk)
            if i % 3 == 0:
                map += "\n"
        return map


# Create instances of Chunk with realistic names and descriptions
chunk_one = Chunk(
    name="Forest Clearing",
    description="A peaceful clearing in the forest",
    cords={"x": 5, "y": 4, "z": 4},
)
chunk_two = Chunk(
    name="Mountain Peak",
    description="Snow-covered peak of the tallest mountain",
    cords={"x": 10, "y": 10, "z": 2},
)
chunk_three = Chunk(
    name="Riverside",
    description="A serene riverside with gentle flowing water",
    cords={"x": 1, "y": 8, "z": 1},
)
chunk_four = Chunk(
    name="Desert Outpost",
    description="A small outpost in the vast desert",
    cords={"x": 2, "y": 5, "z": 0},
)

# Create an instance of Player with realistic data
player_one = Player(
    uuid="af23b8e7-4c11-4dbb-8239-a78f5f0197d5",
    nick_name="ExplorerJohn",
    current_location={"x": 23, "y": 10, "z": -1},
)

# Create an instance of Map and add chunks to it
map_instance = Map(
    chunks=[
        chunk_one.getChunk(),
        chunk_two.getChunk(),
        chunk_three.getChunk(),
        chunk_four.getChunk(),
    ]
)

# # Test the Map class by running it
map = map_instance.run()
print(map)
