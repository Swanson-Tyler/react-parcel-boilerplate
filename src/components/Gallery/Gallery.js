import React from 'react';
import Dropzone from 'react-dropzone';
import Styles from './Gallery.scss';
import { fontData } from '../../mockdata/fonts';

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
    this.setState({ allFonts: fontData.fonts });
  }

  onItemRemove(itemIndex) {
    const { allFonts } = this.state;
    const updatedFonts = Array.from(allFonts).filter((_, index) => itemIndex !== index);
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

      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = () => {
        this.uploadFont({
          name: splitFileName[0],
          fileName: file.name,
          url: 'http://example.com/font.ttf'
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
        statusCode: 200
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
      <Dropzone onDrop={acceptedFiles => this.handleFileDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div className={Styles.gallery} {...getRootProps()}>
            {/* <input {...getInputProps()} type="file" name="files" /> */}
            <div className={Styles.galleryList}>
              {allFonts.map(({ name, fileName, url }, index) => {
                return (
                  <GalleryItem
                    key={name}
                    name={name}
                    fileName={fileName}
                    url={url}
                    copy={fontExampleCopy}
                    onRemove={this.onItemRemove}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

class GalleryItem extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, fontName: null };
    this.loadFont = this.loadFont.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.loadFont();
    }, 2000); // mimic fetch loading time
  }

  shouldComponentUpdate() {
    const { loading } = this.state;
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
