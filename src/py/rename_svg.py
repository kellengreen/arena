import os
import re

svg_path = '/home/kgreen/projects/arena/src/svg/characters/'

map = {
    'type': {
        'Archer': 'archer',
        'Assassin': 'assassin',
        'Brute': 'brute',
        'Cleric': 'cleric',
        'Mage': 'mage',
        'Swordsman': 'swordsman',
    },
    'state': {
        'Dmg': 'damage',
        'Spprt': 'support',
        'Atck': 'attack',
        'Blck': 'block',
        'Idle': 'idle',
    }
}

for item in os.walk(svg_path):
    dirpath, dirnames, filenames = item
    for filename in filenames:
        match = re.match(r'^Arena_Sprites_(?P<type>[\w]+)_(?P<state>[\w]+)_(?P<frame>[\d]+).svg$', filename)
        if match:
            new_filename = '%s_%s_%s.svg' % (
                map['type'][match.group('type')],
                map['state'][match.group('state')],
                int(match.group('frame')),
            )
            old_fullpath = '%s/%s' % (dirpath, filename)
            new_fullpath = '%s/%s' % (dirpath, new_filename)
            os.rename(old_fullpath, new_filename)
            print(new_fullpath)

