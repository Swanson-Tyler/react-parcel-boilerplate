import React from 'react';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import defaultToast from 'components/Toast/Toast';
import Styles from './Gallery.scss';
import { fontData } from '../../mockdata/fonts';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_PANGRAM = 'The quick brown fox jumps over the lazy dog';
const ACCEPTED_FONT_EXTENSIONS = ['ttf', 'otf'];

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = { allFonts: [], fontExampleCopy: DEFAULT_PANGRAM };
    this.uploadFont = this.uploadFont.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
  }

  componentDidMount() {
    toast('Wow so easy !', defaultToast);

    this.setState({ allFonts: fontData.fonts });
  }

  onItemRemove(name) {
    // filtering by name is safer than by index. Especially if we want the user to be able to shuffle order of the fonts
    const { allFonts } = this.state;
    const updatedFonts = Array.from(allFonts).filter(font => font.name !== name);
    this.setState({ allFonts: updatedFonts });
  }

  handleFileDrop(files) {
    // no files in drop
    if (files.length < 1) {
      return;
    }

    files.forEach(file => {
      const splitFileName = file.name.split('.');
      const fileExtension = splitFileName[splitFileName.length - 1];

      if (!ACCEPTED_FONT_EXTENSIONS.includes(fileExtension)) {
        console.log(`${file.name} does not have an accepted file extension`);
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = () => {
        this.uploadFont({
          name: splitFileName[0],
          fileName: file.name,
          data: fileReader.result
        });
      };

      // problem reading files
      fileReader.onabort = () => console.log(`file ${file.name} reading was aborted`);
      fileReader.onerror = () => console.log(`file ${file.name} reading has failed`);
    });
  }

  uploadFont(newFont) {
    // fake POST request saving file
    setTimeout(() => {
      const response = {
        // fake response
        ok: true,
        statusCode: 200,
        data: {
          name: newFont.name,
          fileName: newFont.fileName,
          url: 'http://example.com/font.ttf'
        }
      };

      if (!response.error) {
        const { allFonts } = this.state;
        const updatedFonts = Array.from(allFonts);
        updatedFonts.unshift(newFont);
        this.setState({ allFonts: updatedFonts });
      }
    }, 2000);
  }

  render() {
    const { allFonts, fontExampleCopy } = this.state;

    return (
      <React.Fragment>
        <Dropzone onDrop={acceptedFiles => this.handleFileDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div
              className={Styles.gallery}
              {...getRootProps()}
              onKeyDown={e => {
                console.log(e.key);
                if (e.key === 'f') {
                  toast('Wow so easy !', defaultToast);
                }
              }}
            >
              {/* <input {...getInputProps()} type="file" name="files" /> */}
              <div className={Styles.galleryList}>
                {allFonts.map(({ name, fileName, url }) => {
                  return (
                    <GalleryItem
                      key={name}
                      name={name}
                      fileName={fileName}
                      url={url}
                      copy={fontExampleCopy}
                      onRemove={() => {
                        this.onItemRemove(name);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Dropzone>
      </React.Fragment>
    );
  }
}

class GalleryItem extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, fontName: null };
    this.loadFont = this.loadFont.bind(this);
    this.timeoutId = null;
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.loadFont();
    }, 500); // mimic fetch loading time
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  shouldComponentUpdate() {
    const { loading } = this.state;
    // If we've already loaded the font, no need to re-render when the parent state updates. Dropzone will call re-render based on mousemove so
    // we should prevent re-render unless necessary.
    if (!loading) {
      return false;
    }

    return true;
  }

  loadFont() {
    const { name, url } = this.props;
    const newFont = new FontFace(name, `url(${url})`);
    // This will work with CORS enabled
    // newFont
    //   .load()
    //   .then(loadedFont => {
    //     document.fonts.add(loadedFont);
    //   })
    //   .catch(error => {
    //     console.error('Error loading font: ', error);
    //     this.setState({ fontName: 'Helvetica Neue', loading: false, error: error });

    //   });

    this.setState({ fontName: 'Helvetica Neue', loading: false });
  }

  render() {
    const { name, copy, onRemove } = this.props;
    const { loading, fontName } = this.state;
    return (
      <div className={Styles.galleryItem} key={name}>
        {loading && <div className={Styles.galleryItemLoading}>Loading</div>}
        {!loading && (
          <div className={Styles.fontExample} style={{ fontFamily: fontName }}>
            {copy}
          </div>
        )}

        <div className={Styles.fontInfoContainer}>
          <div className={Styles.fontName}>{name}</div>
        </div>

        <div className={Styles.removeButton} onClick={onRemove}>
          remove
        </div>
      </div>
    );
  }
}

export default Gallery;
