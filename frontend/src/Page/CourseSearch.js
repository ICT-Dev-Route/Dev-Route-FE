import React, { useState } from 'react';
import { Header, Footer } from '../Component';

function CourseSearch() {
  const [platform, setPlatform] = useState('youtube');

  return (
    <>
      <Header page="CourseSearch" />
      <div className="container">
        <div className="search-bar d-flex justify-content-start align-items-center mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="기술스택 선택하기"
            style={{ width: '300px' }}
          />
          <button className="btn btn-success ms-2">검색</button>

          <div className="btn-group ms-3" role="group">
            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="youtube"
              value="youtube"
              checked={platform === 'youtube'}
              onChange={() => setPlatform('youtube')}
            />
            <label className="btn btn-outline-danger" htmlFor="youtube">
              유튜브
            </label>
            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="inflearn"
              value="inflearn"
              checked={platform === 'inflearn'}
              onChange={() => setPlatform('inflearn')}
            />
            <label className="btn btn-outline-success" htmlFor="inflearn">
              인프런
            </label>

            <input
              type="radio"
              className="btn-check"
              name="platform"
              id="udemy"
              value="udemy"
              checked={platform === 'udemy'}
              onChange={() => setPlatform('udemy')}
            />
            <label className="btn btn-outline-primary" htmlFor="udemy">
              유데미
            </label>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          {/* Repeat similar cards as needed */}
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="Thumbnail"
              />
              <div className="card-body">
                <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet (Official Audio)
                </p>
                <p className="card-text">
                  <small className="text-muted">10k views · 2 hours ago</small>
                </p>
              </div>
            </div>
          </div>
          {/* Add more cards as per requirement */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseSearch;
