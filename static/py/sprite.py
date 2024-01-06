from PIL import Image

sprite_sheet_path = '../img/wizard idle.png'
sprite_sheet = Image.open(sprite_sheet_path)

sprite_width = 80
sprite_height = 80

animated_gif = Image.new('RGBA', (sprite_width, sprite_height))

frames = []

for x in range(0, sprite_sheet.width, sprite_width):
    sprite = sprite_sheet.crop((x, 0, x + sprite_width, sprite_height))
    frames.append(sprite)

animated_gif.save('anim.gif', save_all=True, append_images=frames, duration=100, loop=0)
