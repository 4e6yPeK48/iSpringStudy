from PIL import Image

sprite_sheet_path = '../img/dec_hor.png'
sprite_sheet = Image.open(sprite_sheet_path)

sprite_width = 124
sprite_height = 104

animated_gif = Image.new('RGBA', (sprite_width, sprite_height))

frames = []

for x in range(0, sprite_sheet.width, sprite_width):
    sprite = sprite_sheet.crop((x, 0, x + sprite_width, sprite_height))
    frames.append(sprite)
    sprite.save(f'd{x}A.png')
