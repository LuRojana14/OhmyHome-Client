import React, { Component } from "react";


class Photo extends Component {
    render() {
      return (
        <div>
            <div class="image-profile-button">
                <label for="">Image</label>
                <input class="controls" type="file" name="photo"/>
            </div>
        </div>
      );
    }
}
export default Photo;