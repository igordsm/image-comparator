import os.path
import glob
import shutil
import sys
	
import tkinter as tk

def copy_resources_to_dest(dest):
    path = os.path.realpath(__file__)
    shutil.copytree(os.path.dirname(path) + '/resources', dest)
    
def generate_image_list(dest, folders):
    image_list = set([os.path.basename(f) for f in glob.glob(folders[0] + '/*.png')])    
    for fldr in folders[1:]:
        images = set([os.path.basename(f) for f in glob.glob(fldr + '/*.png')])    
        image_list = set.intersection(image_list, images)
    return image_list

def get_dir_name(fldr):
    a, b = os.path.split(fldr)
    if b == '':
        return os.path.split(a)[1]
    else:
        return b

def write_image_list(dest, folder_names, option_names, image_list):
    images = sorted(list(image_list))
    with open(dest + '/js/data.js', 'w') as f:
        f.write('var images = ' + str(images) + '\n')
        f.write('var folders = ' + str(folder_names) + '\n')
        f.write('var names = ' + str(option_names) + '\n')

if __name__ == "__main__":
    dest = sys.argv[1]
    folders = sys.argv[3::2]
    names = sys.argv[2::2]
    print(folders, names)
    folder_names = [get_dir_name(fldr) for fldr in folders]
    copy_resources_to_dest(dest)
    image_list = generate_image_list(dest, folders)
    write_image_list(dest, folder_names, names, image_list)
    
    for i, fldr in enumerate(folders):
        print('Copying', fldr)
        dirname = os.path.join(dest, folder_names[i]) 
        os.mkdir(os.path.join(dest, folder_names[i]))
        for image in image_list:
            shutil.copy(os.path.join(fldr, image), os.path.join(dirname, image) )
        
        
    

